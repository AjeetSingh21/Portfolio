import { motion } from 'framer-motion'

export default function Loader({ done }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      style={{ pointerEvents: done ? 'none' : 'auto' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#04040b]"
    >
      <div className="kicker mb-6">initializing latent space</div>
      <div className="relative h-16 w-16">
        <span className="absolute inset-0 animate-ping rounded-full bg-cyan2/30" />
        <span className="absolute inset-2 rounded-full bg-gradient-to-tr from-indigo2 via-cyan2 to-magenta2 blur-[2px]" />
      </div>
      <div className="mono mt-8 text-xs tracking-widest text-white/40">
        sampling 78,000 points · loading targets
      </div>
    </motion.div>
  )
}
