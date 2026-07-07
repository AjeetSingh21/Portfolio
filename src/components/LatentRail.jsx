import { SECTIONS } from '../sections'
import { store, getLenis } from '../lib/store'
import { usePoll } from './ui'

export default function LatentRail() {
  const active = usePoll(() => store.section)
  const go = (id) => {
    const l = getLenis()
    if (l) l.scrollTo('#' + id)
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {SECTIONS.map((s, i) => {
        const on = i === active
        return (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            className="group flex items-center gap-3"
            aria-label={s.label}
          >
            <span
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                on ? 'scale-150 bg-cyan2 shadow-[0_0_12px_#16E0FF]' : 'bg-white/25 group-hover:bg-white/60'
              }`}
            />
            <span
              className={`mono text-[10px] tracking-[0.18em] transition-all duration-300 ${
                on ? 'text-cyan2 opacity-100' : 'text-white/40 opacity-0 group-hover:opacity-100'
              }`}
            >
              {s.num} {s.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
