import Reveal from './Reveal.jsx'

// 精选项目：大卡片展示作品图片（图片先用渐变色占位，换图时把 work__thumb 里的占位换成 <img>）
const works = [
  {
    title: '桌面端智能体交互原型',
    category: '桌面端应用',
    year: '2026',
    tags: ['Electron', 'AI 工具调用', 'Claude Code'],
    gradient: 'linear-gradient(135deg, #2b2350, #1a1630)',
  },
  {
    title: '个人履历展示网页',
    category: '网页开发',
    year: '2026',
    tags: ['HTML/CSS', '线上部署', 'GitHub Pages'],
    gradient: 'linear-gradient(135deg, #0f3a44, #0c2530)',
  },
]

export default function Works() {
  return (
    <section id="works" className="works section">
      <div className="container">
        <Reveal>
          <h2 className="section-title"><span>02</span> 精选项目</h2>
        </Reveal>

        <div className="works__grid">
          {works.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <article className="work">
                <div className="work__thumb" style={{ background: w.gradient }}>
                  {/* 图片占位：换成 <img src="/work-1.jpg" alt={w.title} /> */}
                  <span className="work__thumb-index">0{i + 1}</span>
                </div>
                <div className="work__meta">
                  <h3 className="work__title">{w.title}</h3>
                  <div className="work__info">
                    <span>{w.category}</span>
                    <span>{w.year}</span>
                  </div>
                  <div className="work__tags">
                    {w.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
