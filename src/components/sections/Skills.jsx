import { Section, Reveal } from '../ui'
import { skills } from '../../data/profile'

export default function Skills() {
  return (
    <Section id="skills" align="right">
      <div className="w-full max-w-2xl">
        <Reveal>
          <div className="kicker mb-4">02 / Arsenal</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            The <span className="grad-text">stack</span> behind the work.
          </h2>
        </Reveal>
        <div className="mt-8 space-y-5">
          {skills.map((s, idx) => (
            <Reveal key={s.group} delay={idx * 0.06}>
              <div className="glass p-5">
                <div className="mono mb-3 text-[11px] tracking-[0.18em] text-cyan2">
                  {s.group.toUpperCase()}
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span key={it} className="chip">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
