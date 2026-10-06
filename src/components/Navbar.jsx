// 顶部导航栏：固定在顶部，滚动时半透明毛玻璃
export default function Navbar() {
  const links = [
    { href: '#about', label: '关于' },
    { href: '#works', label: '作品' },
    { href: '#capabilities', label: '能力' },
    { href: '#contact', label: '联系' },
  ]

  return (
    <header className="navbar">
      <a className="navbar__logo" href="#top">
        邹晓雨<span className="dot">.</span>
      </a>

      <nav className="navbar__links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </nav>

      <a className="navbar__cta" href="#contact">联系我</a>
    </header>
  )
}
