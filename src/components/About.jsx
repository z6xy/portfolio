import Reveal from './Reveal.jsx'

// 个人经历：头像 / 人物图 + 自我介绍 + 联系方式 + 项目数据
export default function About() {
  const stats = [
    { n: '2+', label: '独立项目' },
    { n: '1', label: '已上线部署' },
    { n: '6+', label: '掌握技能' },
    { n: '100%', label: '亲手完成' },
  ]

  const contacts = [
    { label: 'GitHub', value: 'github.com/z6xy', href: 'https://github.com/z6xy' },
    { label: 'Email', value: '2493764980@qq.com', href: 'mailto:2493764980@qq.com' },
  ]

  return (
    <section id="about" className="about section">
      <div className="container">
        <Reveal>
          <h2 className="section-title"><span>01</span> 个人经历</h2>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__figure">
            {/* 头像占位：换成照片时，把这行 div 换成 <img src="/avatar.jpg" alt="邹晓雨" /> */}
            <div className="about__avatar">邹晓雨</div>
          </Reveal>

          <Reveal className="about__body" delay={120}>
            <p className="about__lead">
              独立开发者 / AI 工具实践者。相信「先动手做出来，再慢慢做好」。
            </p>
            <p className="about__text">
              用 Claude Code 等 AI 工具，独立完成桌面应用、自动化工作流和个人网站。擅长把重复劳动交给脚本和 AI，把精力留给真正需要判断力的部分。
            </p>
            <ul className="about__contacts">
              {contacts.map((c) => (
                <li key={c.label}>
                  <span className="about__contacts-label">{c.label}</span>
                  {c.href ? <a href={c.href} target="_blank" rel="noreferrer">{c.value}</a> : <span>{c.value}</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="about__stats" delay={200}>
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__n">{s.n}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
