import { useEffect, useState } from 'react'
import { SECTIONS } from '../sections'
import { store } from '../lib/store'
import { usePoll } from './ui'

export default function Hud() {
  const section = usePoll(() => store.section)
  const fps = usePoll(() => Math.round(store.fps))
  const [vec, setVec] = useState('z[0]=0.00')
  useEffect(() => {
    const id = setInterval(() => {
      let s = ''
      for (let k = 0; k < 3; k++) s += `z[${k}]=${(Math.random() * 2 - 1).toFixed(2)}  `
      setVec(s)
    }, 420)
    return () => clearInterval(id)
  }, [])
  const cur = SECTIONS[Math.min(section, SECTIONS.length - 1)]
  return (
    <>
      <div className="pointer-events-none fixed left-5 bottom-4 z-40 hidden md:block">
        <div className="mono text-[10px] tracking-[0.2em] text-white/45">
          {cur.num} / <span className="text-cyan2">{cur.label.toUpperCase()}</span>
        </div>
      </div>
      <div className="pointer-events-none fixed right-5 bottom-4 z-40 hidden text-right md:block">
        <div className="mono text-[10px] tracking-[0.14em] text-cyan2/80">{vec}</div>
        <div className="mono text-[10px] tracking-[0.14em] text-white/35">
          fps {fps} · latent space online
        </div>
      </div>
    </>
  )
}
