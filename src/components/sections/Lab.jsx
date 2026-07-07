import { Section, Reveal } from '../ui'
import { useRepos } from '../../lib/useRepos'

const LANG = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#DA5B0B',
  TypeScript: '#3178c6',
  'C++': '#f34b7d',
  C: '#555555',
}

function prettify(name) {
  return name.replace(/[-_]/g, ' ')
}

export default function Lab() {
  const { repos, live } = useRepos()
  const list = repos.filter((r) => r.name.toLowerCase() !== 'ajeetsingh21' && !r.fork)

  return (
    <Section id="lab" align="center" className="!py-28">
      <div className="w-full max-w-5xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="kicker mb-3">08 / The Lab</div>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                {list.length} experiments, <span className="grad-text">live from GitHub</span>.
              </h2>
            </div>
            <div className="mono flex items-center gap-2 text-[11px] text-white/45">
              <span
                className={`h-2 w-2 rounded-full ${live ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' : 'bg-white/30'}`}
              />
              {live ? 'synced live' : 'cached snapshot'}
            </div>
          </div>
        </Reveal>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <Reveal key={r.name} delay={Math.min(i, 8) * 0.04}>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col glass p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan2/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold capitalize text-white/90 group-hover:text-cyan2">
                    {prettify(r.name)}
                  </div>
                  {r.homepage && (
                    <span className="chip shrink-0 !border-green-400/40 !text-green-300">live</span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-white/55">
                  {r.description || 'No description — open to explore the code.'}
                </p>
                <div className="mono mt-4 flex items-center gap-4 text-[10px] text-white/45">
                  {r.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: LANG[r.language] || '#888' }}
                      />
                      {r.language}
                    </span>
                  )}
                  {r.stars > 0 && <span>★ {r.stars}</span>}
                  <span className="ml-auto opacity-60">{r.updated}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
