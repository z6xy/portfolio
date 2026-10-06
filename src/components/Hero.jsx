// 全屏首页 Hero：抖动波纹背景 + 大标题 + 导航 + 联系按钮
import DitherBackground from './DitherBackground.jsx'

export default function Hero() {
  return (
    <section id="top" className="hero">
      {/* 背景：黑白抖动波纹（零依赖 WebGL，见 DitherBackground.jsx） */}
      <DitherBackground />

      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">桌面端轻量应用开发 · 自动化工作流搭建</p>
        <h1 className="hero__title">
          邹晓雨<span className="hero__dot">.</span>
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
