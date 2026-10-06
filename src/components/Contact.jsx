import Reveal from './Reveal.jsx'
import TechText from './TechText.jsx'

// 底部联系方式：整屏收尾页
export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <Reveal>
          <p className="contact__eyebrow">有想法？聊一聊</p>
          <h2 className="contact__title">
            <div className="contact__title-line">
              <TechText text="一起做点" color="#ececf2" accentColor="#6e56cf" fontSize={110} />
            </div>
            <div className="contact__title-line">
              <TechText text="不一样的东西" color="#ececf2" accentColor="#6e56cf" fontSize={110} />
            </div>
          </h2>
          <a className="btn btn--primary btn--lg" href="mailto:2493764980@qq.com">发邮件给我</a>
        </Reveal>

        <Reveal delay={150}>
          <div className="contact__links">
            <a href="https://github.com/z6xy" target="_blank" rel="noreferrer">GitHub</a>
            <a href="mailto:2493764980@qq.com">Email</a>
            <span>© 2026 邹晓雨</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
