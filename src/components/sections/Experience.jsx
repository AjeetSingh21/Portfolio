import { Section, Reveal } from '../ui'
import { experience, certificates } from '../../data/profile'

export default function Experience() {
  return (
    <Section id="experience" align="left">
      <div className="w-full max-w-3xl">
        <Reveal>
          <div className="kicker mb-4">07 / Trajectory</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Where I've <span className="grad-text">trained</span>.
          </h2>
        </Reveal>

        <div className="mt-9 border-l border-white/10 pl-6">
          {experience.map((e, i) => (
            <Reveal key={e.org} delay={i * 0.08}>
              <div className="relative mb-8">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-gradient-to-tr from-cyan2 to-magenta2 shadow-[0_0_10px_#16E0FF]" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white/90">
                    {e.role} <span className="text-cyan2">· {e.org}</span>
                  </h3>
                  <span className="mono text-[11px] text-white/45">
                    {e.period} · {e.place}
                  </span>
                </div>
                <ul className="mt-2 space-y-1">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-white/60">
                      <span className="text-magenta2">›</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="kicker mb-3 mt-2 !text-white/40">Certificates & wins</div>
          <div className="grid gap-3 sm:grid-cols-3">
            {certificates.map((c) => (
              <div key={c.title} className="glass p-4">
                <div className="text-sm font-semibold text-white/85">{c.title}</div>
                <div className="mono mt-1 text-[10px] text-cyan2">{c.org}</div>
                <div className="mt-1 text-xs text-white/50">{c.note}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
