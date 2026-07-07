import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import ParticleField from './three/ParticleField'
import { SECTIONS } from './sections'
import { store, setLenis } from './lib/store'
import { flagship } from './data/profile'

import Loader from './components/Loader'
import Nav from './components/Nav'
import LatentRail from './components/LatentRail'
import Hud from './components/Hud'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import ProjectSection from './components/sections/ProjectSection'
import Experience from './components/sections/Experience'
import Lab from './components/sections/Lab'
import Contact from './components/sections/Contact'

const find = (id) => flagship.find((f) => f.id === id)

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    store.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({ lerp: store.reduceMotion ? 1 : 0.1, smoothWheel: !store.reduceMotion })
    setLenis(lenis)

    let last = performance.now()
    let raf
    const loop = (time) => {
      lenis.raf(time)
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      store.progress = p
      store.stageF = p * (SECTIONS.length - 1)
      store.section = Math.round(store.stageF)
      const dt = time - last
      last = time
      if (dt > 0) store.fps = store.fps * 0.9 + (1000 / dt) * 0.1
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onMove = (e) => {
      store.ndc.x = (e.clientX / window.innerWidth) * 2 - 1
      store.ndc.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onDown = () => (store.press = 1)
    const onUp = () => (store.press = 0)
    const onTouch = (e) => {
      if (e.touches[0]) {
        store.ndc.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
        store.ndc.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
      }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchstart', (e) => { store.press = 1; onTouch(e) }, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onUp)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onUp)
    }
  }, [])

  return (
    <>
      <Loader done={ready} />
      <ParticleField onReady={() => setReady(true)} />

      <div className="pointer-events-none">
        <div className="pointer-events-auto">
          <Nav />
          <LatentRail />
          <Hud />
        </div>
      </div>

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <ProjectSection id="readyme" item={find('readyme')} index="03" align="left" />
        <ProjectSection id="rag" item={find('rag')} index="04" align="right" />
        <ProjectSection id="vision" item={find('mask')} index="05" align="left" />
        <ProjectSection id="web" item={find('cereal')} index="06" align="right" />
        <Experience />
        <Lab />
        <Contact />
      </main>
    </>
  )
}
