import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Section({ id, align = 'left', children, className = '' }) {
  const a =
    align === 'right' ? 'md:justify-end' : align === 'center' ? 'justify-center' : 'md:justify-start'
  return (
    <section
      id={id}
      className={`relative flex min-h-screen w-full items-center justify-center ${a} px-5 py-24 md:px-20 ${className}`}
    >
      {children}
    </section>
  )
}

// rAF-poll a primitive from the imperative store without re-rendering on the hot path
export function usePoll(fn) {
  const [v, setV] = useState(fn)
  const ref = useRef(v)
  useEffect(() => {
    let id
    const tick = () => {
      const nv = fn()
      if (!Object.is(nv, ref.current)) {
        ref.current = nv
        setV(nv)
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return v
}
