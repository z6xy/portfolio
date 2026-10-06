import { useEffect, useRef } from 'react'

// 零依赖的「抖动波纹」WebGL 背景（复刻 ReactBits 的 Dither 效果）：
// 黑底 + 灰色噪声波纹 + 8×8 Bayer 有序抖动 + 像素化 + 鼠标扰动。
// 用原生 WebGL1 + GLSL ES 1.00 实现，不引入 three.js / react-three-fiber 等重依赖。

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;

uniform vec2  u_res;     // 画布尺寸（物理像素）
uniform float u_time;    // 秒
uniform vec2  u_mouse;   // 鼠标位置（物理像素，原点左下）
uniform float u_radius;  // 鼠标影响半径（物理像素）
uniform float u_enable;  // 是否开启鼠标交互（0/1）
uniform vec3  u_wave;    // 波纹颜色
uniform vec3  u_bg;      // 背景颜色
uniform float u_levels;  // 灰度级数
uniform float u_pixel;   // 像素块大小

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = p * 2.03 + 11.7;
    a *= 0.5;
  }
  return v;
}

// 8×8 Bayer 有序抖动矩阵（递归生成，归一化到 [0,1)），避免用数组索引。
float bayer8(vec2 p) {
  p = floor(mod(p, 8.0));
  float idx = 0.0, w = 1.0, bit = 1.0;
  for (int i = 0; i < 3; i++) {
    float a = mod(floor(p.x / bit), 2.0);
    float b = mod(floor(p.y / bit), 2.0);
    idx += w * (2.0 * a + 3.0 * b - 4.0 * a * b);
    w *= 4.0;
    bit *= 2.0;
  }
  return idx / 64.0;
}

void main() {
  // 像素化：把坐标量化到 u_pixel 大小的块
  vec2 cell = floor(gl_FragCoord.xy / u_pixel);
  vec2 uv = cell / (u_res / u_pixel);

  vec2 p = uv;
  if (u_enable > 0.5) {
    vec2 m = u_mouse;
    vec2 d = gl_FragCoord.xy - m;
    float dist = length(d);
    float e = 1.0 - smoothstep(0.0, u_radius, dist);
    vec2 dir = d / max(dist, 1e-4);
    p += dir * e * 0.12;
  }

  // 缓慢流动的噪声波纹
  float t = u_time * 0.3;
  float n1 = fbm(p * 3.0 + vec2(t, t * 0.7));
  float n2 = fbm(p * 5.0 - vec2(t * 0.8, t * 0.3));
  float w = n1 * 0.72 + n2 * 0.28;

  // 有序抖动 + 量化到 u_levels 级
  float thresh = bayer8(cell) - 0.25;
  float stepSize = 1.0 / max(u_levels - 1.0, 1.0);
  float q = clamp(w + thresh * stepSize, 0.0, 1.0);
  q = floor(q * (u_levels - 1.0) + 0.5) / max(u_levels - 1.0, 1.0);

  vec3 col = mix(u_bg, u_wave, q);
  gl_FragColor = vec4(col, 1.0);
}
`

export default function DitherBackground({
  waveColor = [0.6, 0.6, 0.6],
  bgColor = [0, 0, 0],
  levels = 4,
  pixelSize = 2,
  radius = 170,
  enableMouse = true,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      canvas.getContext('webgl', { antialias: false }) ||
      canvas.getContext('experimental-webgl')
    if (!gl) return

    function compile(type, src) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Dither shader error:', gl.getShaderInfoLog(shader))
      }
      return shader
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Dither link error:', gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    // 单个大三角形覆盖全屏
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uRadius = gl.getUniformLocation(prog, 'u_radius')
    const uEnable = gl.getUniformLocation(prog, 'u_enable')
    const uWave = gl.getUniformLocation(prog, 'u_wave')
    const uBg = gl.getUniformLocation(prog, 'u_bg')
    const uLevels = gl.getUniformLocation(prog, 'u_levels')
    const uPixel = gl.getUniformLocation(prog, 'u_pixel')

    gl.uniform3f(uWave, waveColor[0], waveColor[1], waveColor[2])
    gl.uniform3f(uBg, bgColor[0], bgColor[1], bgColor[2])
    gl.uniform1f(uLevels, levels)
    gl.uniform1f(uPixel, pixelSize)
    gl.uniform1f(uEnable, enableMouse ? 1 : 0)
    gl.uniform1f(uRadius, radius)

    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    function onMove(e) {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    window.addEventListener('pointermove', onMove)

    const t0 = performance.now()
    function frame(now) {
      gl.uniform1f(uTime, (now - t0) / 1000)
      gl.uniform2f(uMouse, mouse.x * dpr, (h - mouse.y) * dpr)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
    }
  }, [waveColor, bgColor, levels, pixelSize, radius, enableMouse])

  return <canvas ref={canvasRef} className="hero__dither" aria-hidden="true" />
}
