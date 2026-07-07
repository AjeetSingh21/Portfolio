import { getLenis } from '../lib/store'
import { profile } from '../data/profile'

const links = [
  ['About', '#about'],
  ['Work', '#readyme'],
  ['Lab', '#lab'],
  ['Contact', '#contact'],
]

export default function Nav() {
  const go = (e, sel) => {
    e.preventDefault()
    const l = getLenis()
    if (l) l.scrollTo(sel, { offset: -10 })
    else document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 md:px-10">
      <a href="#hero" onClick={(e) => go(e, '#hero')} className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-cyan2 to-magenta2" />
        <span className="mono text-sm tracking-[0.2em] text-white/85">AJEET.S</span>
      </a>
      <div className="hidden items-center gap-7 md:flex">
        {links.map(([label, sel]) => (
          <a
            key={sel}
            href={sel}
            onClick={(e) => go(e, sel)}
            className="mono text-xs tracking-[0.16em] text-white/55 transition hover:text-cyan2"
          >
            {label}
          </a>
        ))}
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="chip transition hover:border-cyan2 hover:text-cyan2"
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  )
}
