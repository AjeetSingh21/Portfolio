// Builds one Float32Array(count*3) target buffer per section "kind".
// All shapes are centered on the origin, scaled to roughly +/-240 x, +/-160 y.
import { SECTIONS } from '../sections'
import { profile } from '../data/profile'

const TAU = Math.PI * 2
const rand = (a, b) => a + Math.random() * (b - a)
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) // ~N(0,~0.5)

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Resample an arbitrary point list into exactly `count` points.
function fit(pts, count) {
  const out = new Float32Array(count * 3)
  if (!pts.length) return out
  shuffle(pts)
  const n = pts.length
  for (let i = 0; i < count; i++) {
    const p = pts[i % n]
    const rep = i >= n
    const j = rep ? 4 : 0
    out[i * 3] = p[0] + (rep ? rand(-j, j) : 0)
    out[i * 3 + 1] = p[1] + (rep ? rand(-j, j) : 0)
    out[i * 3 + 2] = (p[2] || 0) + (rep ? rand(-j, j) : 0)
  }
  return out
}

const loadImg = (url) =>
  new Promise((res, rej) => {
    const im = new Image()
    im.crossOrigin = 'anonymous'
    im.onload = () => res(im)
    im.onerror = rej
    im.src = url
  })

async function sampleImage(url, planeW = 360, step = 2, thresh = 50) {
  const im = await loadImg(url)
  const W = 170
  const H = Math.max(1, Math.round((W * im.height) / im.width))
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const x = c.getContext('2d', { willReadFrequently: true })
  x.drawImage(im, 0, 0, W, H)
  const d = x.getImageData(0, 0, W, H).data
  const planeH = (planeW * H) / W
  const pts = []
  for (let py = 0; py < H; py += step)
    for (let px = 0; px < W; px += step) {
      const i = (py * W + px) * 4
      const lum = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114
      if (d[i + 3] > 128 && lum > thresh) {
        const X = (px / W - 0.5) * planeW
        const Y = -(py / H - 0.5) * planeH
        const Z = (lum / 255 - 0.5) * 36
        pts.push([X, Y, Z])
      }
    }
  return pts
}

async function sampleText(lines, opts = {}) {
  const { planeW = 520, fontSize = 72, weight = 700, step = 3 } = opts
  await (document.fonts ? document.fonts.ready : Promise.resolve())
  const W = 600
  const H = 280
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const x = c.getContext('2d', { willReadFrequently: true })
  x.fillStyle = '#fff'
  x.textAlign = 'center'
  x.textBaseline = 'middle'
  x.font = `${weight} ${fontSize}px "Space Grotesk", sans-serif`
  const lh = fontSize * 1.04
  const y0 = H / 2 - ((lines.length - 1) * lh) / 2
  lines.forEach((ln, i) => x.fillText(ln, W / 2, y0 + i * lh))
  const d = x.getImageData(0, 0, W, H).data
  const planeH = (planeW * H) / W
  const pts = []
  for (let py = 0; py < H; py += step)
    for (let px = 0; px < W; px += step)
      if (d[(py * W + px) * 4 + 3] > 128) {
        pts.push([(px / W - 0.5) * planeW, -(py / H - 0.5) * planeH, rand(-8, 8)])
      }
  return pts
}

const dist2 = (a, b) => {
  const dx = a[0] - b[0],
    dy = a[1] - b[1],
    dz = a[2] - b[2]
  return dx * dx + dy * dy + dz * dz
}

function neuralNet(count) {
  const NN = 34
  const R = 200
  const nodes = []
  for (let i = 0; i < NN; i++) {
    const y = 1 - (i / (NN - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const phi = i * 2.399963
    nodes.push([Math.cos(phi) * r * R, y * R * 0.9, Math.sin(phi) * r * R])
  }
  const edges = []
  for (let i = 0; i < NN; i++) {
    const ds = nodes.map((n, j) => [dist2(nodes[i], n), j]).sort((a, b) => a[0] - b[0])
    edges.push([i, ds[1][1]], [i, ds[2][1]], [i, ds[3][1]])
  }
  const pts = []
  for (let i = 0; i < count; i++) {
    if (i % 5 < 2) {
      const e = edges[(Math.random() * edges.length) | 0]
      const a = nodes[e[0]],
        b = nodes[e[1]],
        t = Math.random()
      pts.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t])
    } else {
      const n = nodes[(Math.random() * NN) | 0]
      pts.push([n[0] + gauss() * 16, n[1] + gauss() * 16, n[2] + gauss() * 16])
    }
  }
  return pts
}

function sphere(count, R = 215, jitter = 6) {
  const pts = []
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / count) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const phi = i * 2.399963
    pts.push([
      Math.cos(phi) * r * R + gauss() * jitter,
      y * R + gauss() * jitter,
      Math.sin(phi) * r * R + gauss() * jitter,
    ])
  }
  return pts
}

function galaxy(count) {
  // flattened spiral disc of repos
  const arms = 4
  const pts = []
  for (let i = 0; i < count; i++) {
    const t = Math.pow(Math.random(), 0.6)
    const rad = t * 250
    const arm = (i % arms) * (TAU / arms)
    const ang = arm + t * 4.0 + gauss() * 0.25
    const spread = (1 - t) * 26 + 6
    pts.push([
      Math.cos(ang) * rad + gauss() * spread,
      gauss() * (10 + (1 - t) * 26),
      Math.sin(ang) * rad + gauss() * spread,
    ])
  }
  return pts
}

function tornado(count) {
  const pts = []
  for (let i = 0; i < count; i++) {
    const t = i / count
    const h = (t - 0.5) * 360
    const taper = 0.25 + (1 - Math.abs(t - 0.5) * 2) * 0.95
    const ang = t * TAU * 10 + gauss() * 0.3
    const rad = (40 + Math.random() * 130) * taper
    pts.push([Math.cos(ang) * rad, h, Math.sin(ang) * rad])
  }
  return pts
}

function iris(count) {
  const pts = []
  for (let i = 0; i < count; i++) {
    const u = Math.random()
    if (u < 0.78) {
      const rr = Math.sqrt(rand(0.16, 1)) * 210 // annulus (pupil hole in center)
      const ang = Math.random() * TAU
      pts.push([Math.cos(ang) * rr, Math.sin(ang) * rr, gauss() * 8 + Math.sin(ang * 12) * 6])
    } else {
      const ang = Math.random() * TAU // outer rim ring
      pts.push([Math.cos(ang) * 222, Math.sin(ang) * 222, gauss() * 4])
    }
  }
  return pts
}

function helix(count) {
  const pts = []
  for (let i = 0; i < count; i++) {
    const t = i / count
    const ang = t * TAU * 5
    const h = (t - 0.5) * 380
    const strand = i % 2 === 0 ? 0 : Math.PI
    const rad = 90
    if (i % 7 === 0) {
      // rungs between strands
      const k = Math.random()
      pts.push([Math.cos(ang) * rad * (1 - 2 * k), h, Math.sin(ang) * rad * (1 - 2 * k)])
    } else {
      pts.push([Math.cos(ang + strand) * rad + gauss() * 5, h, Math.sin(ang + strand) * rad + gauss() * 5])
    }
  }
  return pts
}

function orbit(count) {
  // concentric tilted rings = full-stack "system"
  const rings = [90, 150, 210]
  const pts = []
  for (let i = 0; i < count; i++) {
    const R = rings[i % rings.length]
    const ang = Math.random() * TAU
    const tilt = (i % rings.length) * 0.5
    const x = Math.cos(ang) * R
    const z = Math.sin(ang) * R
    const y = Math.sin(ang) * R * Math.sin(tilt) * 0.6 + gauss() * 6
    pts.push([x, y * Math.cos(tilt) + z * Math.sin(tilt) * 0.2, z * Math.cos(tilt)])
  }
  return pts
}

function body(count) {
  // simple parametric humanoid (ReadyMe mannequin)
  const segs = []
  const seg = (fn, w) => segs.push({ fn, w })
  seg(() => {
    const a = Math.random() * TAU,
      b = Math.acos(rand(-1, 1)),
      r = 30
    return [Math.sin(b) * Math.cos(a) * r, 150 + Math.cos(b) * r, Math.sin(b) * Math.sin(a) * r * 0.8]
  }, 1) // head
  seg(() => [gauss() * 38, rand(40, 120), gauss() * 18], 2.4) // torso
  seg(() => {
    const t = Math.random()
    return [-44 - t * 8, 118 - t * 110, gauss() * 8]
  }, 1.1) // left arm
  seg(() => {
    const t = Math.random()
    return [44 + t * 8, 118 - t * 110, gauss() * 8]
  }, 1.1) // right arm
  seg(() => {
    const t = Math.random()
    return [-18 + gauss() * 6, 40 - t * 150, gauss() * 9]
  }, 1.4) // left leg
  seg(() => {
    const t = Math.random()
    return [18 + gauss() * 6, 40 - t * 150, gauss() * 9]
  }, 1.4) // right leg
  const total = segs.reduce((s, x) => s + x.w, 0)
  const pts = []
  for (let i = 0; i < count; i++) {
    let r = Math.random() * total
    let pick = segs[0]
    for (const s of segs) {
      if (r < s.w) {
        pick = s
        break
      }
      r -= s.w
    }
    const p = pick.fn()
    pts.push([p[0], p[1] - 10, p[2]])
  }
  return pts
}

export async function buildTargets(count) {
  const builders = {}

  // portrait: try the GitHub avatar, fall back to a name wordmark
  builders.portrait = async () => {
    try {
      const p = await sampleImage(profile.avatar, 320, 2, 46)
      if (p.length > 800) return p
    } catch (e) {
      /* tainted canvas / offline -> fallback */
    }
    return sampleText([profile.first.toUpperCase()], { fontSize: 120, planeW: 460 })
  }
  builders.net = async () => neuralNet(count)
  builders.sphere = async () => sphere(count)
  builders.body = async () => body(count)
  builders.tornado = async () => tornado(count)
  builders.iris = async () => iris(count)
  builders.orbit = async () => orbit(count)
  builders.helix = async () => helix(count)
  builders.galaxy = async () => galaxy(count)
  builders.wordmark = async () =>
    sampleText(['AJEET', 'SINGH'], { fontSize: 92, planeW: 520, weight: 700 })

  const buffers = []
  for (const s of SECTIONS) {
    const raw = await builders[s.kind]()
    buffers.push(fit(raw, count))
  }
  return buffers
}
