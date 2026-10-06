import Reveal from './Reveal.jsx'

// 个人优势：能力卡片
const caps = [
  {
    title: '自动化工作流搭建',
    desc: '把重复劳动交给脚本和 AI，端到端把一件事真正跑通。',
    tags: ['脚本', '端到端', '工具链'],
  },
  {
    title: '桌面端轻量应用开发',
    desc: '用 Electron 做出奶蛙桌宠这类轻量桌面应用，能交互、能聊天。',
    tags: ['Electron', '交互', 'IPC'],
  },
  {
    title: '网页开发与布局',
    desc: '独立完成个人网站，从布局、排版到上线部署全流程。',
    tags: ['HTML', 'CSS', '部署'],
  },
  {
    title: 'AI 工具实践',
    desc: '熟练用 Claude Code 等 AI 工具，从零搭应用、定位并解决问题。',
    tags: ['Claude Code', '智能体', 'Prompt'],
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="cap section">
      <div className="container">
        <Reveal>
          <h2 className="section-title"><span>03</span> 个人优势</h2>
        </Reveal>

        <div className="cap__grid">
          {caps.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="cap__card">
                <span className="cap__num">0{i + 1}</span>
                <h3 className="cap__title">{c.title}</h3>
                <p className="cap__desc">{c.desc}</p>
                <div className="cap__tags">
                  {c.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
