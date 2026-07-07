import { Section, Reveal } from '../ui'
import { profile, education } from '../../data/profile'

const accent = {
  magenta: 'text-magenta2',
  cyan: 'text-cyan2',
  gold: 'text-gold2',
  indigo: 'text-indigo2',
}

export default function About() {
  return (
    <Section id="about" align="left">
      <div className="w-full max-w-2xl">
        <Reveal>
          <div className="kicker mb-4">01 / The Mind</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            An <span className="grad-text">AI engineer</span> presented as an AI.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">{profile.intro}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 text-sm leading-relaxed text-white/55">{profile.about}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {profile.stats.map((s) => (
              <div key={s.label} className="glass p-4 text-center">
                <div className={`text-3xl font-bold ${accent[s.accent]}`}>{s.value}</div>
                <div className="mono mt-1 text-[10px] leading-tight tracking-wide text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-8">
            <div className="kicker mb-3 !text-white/40">Education</div>
            <div className="space-y-3">
              {education.map((e) => (
                <div key={e.school} className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-white/85">{e.school}</div>
                    <div className="mono text-[11px] text-white/45">{e.degree}</div>
                  </div>
                  <div className="text-right">
                    <div className="mono text-[11px] text-cyan2">{e.note || e.place}</div>
                    <div className="mono text-[10px] text-white/40">{e.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
