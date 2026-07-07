import { Section, Reveal } from '../ui'
import { profile } from '../../data/profile'

const socials = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'GitHub', value: 'AjeetSingh21', href: profile.github },
  { label: 'LinkedIn', value: 'ajeet-singh', href: profile.linkedin },
  { label: 'Location', value: profile.location, href: null },
]

export default function Contact() {
  return (
    <Section id="contact" align="center" className="text-center">
      <div className="w-full max-w-2xl">
        <Reveal>
          <div className="kicker mb-4">09 / Transmit</div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight glow-text md:text-6xl">
            Let's build something <br />
            <span className="grad-text">that thinks.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-white/60">
            Open to AI/ML roles, research, and collaborations. Send a signal — I reply fast.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-indigo2 via-cyan2 to-magenta2 px-8 py-4 text-sm font-semibold text-[#04040b] shadow-[0_0_40px_-8px_#16E0FF] transition hover:scale-105"
          >
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
            {socials.map((s) =>
              s.href ? (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass p-3 transition hover:border-cyan2/50"
                >
                  <div className="mono text-[10px] tracking-widest text-cyan2">{s.label}</div>
                  <div className="mt-1 truncate text-xs text-white/70">{s.value}</div>
                </a>
              ) : (
                <div key={s.label} className="glass p-3">
                  <div className="mono text-[10px] tracking-widest text-cyan2">{s.label}</div>
                  <div className="mt-1 truncate text-xs text-white/70">{s.value}</div>
                </div>
              )
            )}
          </div>
        </Reveal>

        <div className="mono mt-14 text-[10px] tracking-[0.2em] text-white/30">
          © {new Date().getFullYear()} Ajeet Singh · built as a living latent space
        </div>
      </div>
    </Section>
  )
}
