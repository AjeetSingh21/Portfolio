import { Section, Reveal } from '../ui'

export default function ProjectSection({ id, item, index, align = 'left' }) {
  return (
    <Section id={id} align={align}>
      <div className="w-full max-w-2xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <span
              className="text-6xl font-bold leading-none md:text-7xl"
              style={{ color: item.color, opacity: 0.25 }}
            >
              {index}
            </span>
            <div>
              <div className="mono text-[11px] tracking-[0.2em]" style={{ color: item.color }}>
                {item.tag}
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{item.name}</h2>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass mt-6 p-6 md:p-8">
            {item.badge && (
              <div
                className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: item.color + '22', color: item.color, border: `1px solid ${item.color}55` }}
              >
                {item.badge}
              </div>
            )}
            <p className="text-base leading-relaxed text-white/75">{item.blurb}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="mono text-[11px] text-white/40">{item.period}</span>
              <div className="flex-1" />
              {item.live && (
                <a
                  href={item.live}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-5 py-2 text-xs font-semibold text-[#04040b]"
                  style={{ background: item.color }}
                >
                  Live demo ↗
                </a>
              )}
              {item.repo && (
                <a
                  href={item.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="chip px-5 py-2 transition hover:border-cyan2 hover:text-cyan2"
                >
                  {item.repo.endsWith('AjeetSingh21') ? 'GitHub ↗' : 'Source ↗'}
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
