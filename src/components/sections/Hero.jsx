import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Section } from '../ui'
import { profile } from '../../data/profile'
import { getLenis } from '../../lib/store'

export default function Hero() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2400)
    return () => clearInterval(id)
  }, [])
  const go = (sel) => {
    const l = getLenis()
    if (l) l.scrollTo(sel)
    else document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <Section id="hero" align="center" className="text-center">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="kicker mb-6"
        >
          00 / Ignition — the living latent space
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9 }}
          className="text-5xl font-bold leading-[0.95] tracking-tight glow-text md:text-8xl"
        >
          Ajeet <span className="grad-text">Singh</span>
        </motion.h1>

        <div className="mt-6 flex h-8 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="mono text-sm tracking-[0.25em] text-cyan2 md:text-base"
            >
              ▸ {profile.roles[i]}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
        >
          {profile.tagline} I build computer-vision, RAG, and deep-learning systems that actually run.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => go('#readyme')}
            className="rounded-full bg-gradient-to-r from-indigo2 to-magenta2 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-6px_#FF2BD6] transition hover:scale-105"
          >
            Explore the work
          </button>
          <button
            onClick={() => go('#contact')}
            className="chip px-6 py-3 text-xs transition hover:border-cyan2 hover:text-cyan2"
          >
            Get in touch
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mono mt-14 text-[10px] tracking-[0.3em] text-white/35"
        >
          move to bend the space · hold to detonate
        </motion.div>
      </div>
    </Section>
  )
}
