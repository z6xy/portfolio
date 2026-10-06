import TechText from './TechText.jsx'

// 全屏首页 Hero：视频背景 + 大标题 + 导航 + 联系按钮
// 视频背景：把 mp4 放到 public/hero-bg.mp4，然后取消下面 <video> 的注释，
//          同时删掉 .hero__bg / .hero__glow 两层占位（在 index.css 里）
export default function Hero() {
  return (
    <section id="top" className="hero">
      {/* 占位背景：渐变 + 网格 + 漂浮光斑 */}
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      {/* 真实视频背景（目前注释掉）
      <video className="hero__video" autoPlay muted loop playsInline>
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      */}

      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">桌面端轻量应用开发 · 自动化工作流搭建</p>
        <h1 className="hero__title">
          <TechText
            text="邹晓雨."
            color="#ececf2"
            accentColor="#6e56cf"
            fontSize={170}
          />
        </h1>
        <p className="hero__subtitle">
          用 AI 工具，把一个个想法做成能跑、能上线的东西。
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#contact">联系我</a>
          <a className="btn btn--ghost" href="#works">看作品 ↓</a>
        </div>
      </div>

      <a className="hero__scroll" href="#about">SCROLL</a>
    </section>
  )
}
