// A tiny non-React store shared between the scroll layer and the WebGL layer.
// Mutated imperatively each frame to avoid React re-renders on the hot path.
export const store = {
  progress: 0, // 0..1 overall scroll
  stageF: 0, // progress * (sections-1)
  section: 0, // rounded current section index
  ndc: { x: -2, y: -2 }, // pointer in normalized device coords
  press: 0, // 1 while pointer held (detonate)
  ready: false, // particle targets built
  fps: 60,
  reduceMotion: false,
}

let lenisRef = null
export const setLenis = (l) => (lenisRef = l)
export const getLenis = () => lenisRef
