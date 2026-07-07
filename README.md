# LATENT — Ajeet Singh's 3D Portfolio

> A 100,000-particle mind that thinks in shapes.

A WebGL portfolio where one continuous GPU particle system **is** the entire site.
Scrolling morphs the cloud through ten shapes (spiral galaxy → neural net → constellation →
ReadyMe body-scanner → RAG tornado → CV lens → full-stack rings → career helix → repo sphere →
your name). The cursor is a gravity well — move to bend the space, **hold to detonate**.

Built on the **LATENT** concept, chosen from an 8-concept design brainstorm.

## Tech stack

- **React 18 + Vite**
- **react-three-fiber / three.js** — the particle field + custom GLSL morph shader
- **@react-three/postprocessing** — UnrealBloom for the plasma glow
- **GSAP-style scroll** via **Lenis** smooth scrolling
- **framer-motion** — section reveals & micro-interactions
- **Tailwind CSS** — layout & UI chrome
- Live **GitHub API** data for the project "Lab" (with a baked snapshot fallback)

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Deploy

The build is fully static (`base: './'`), so `dist/` drops onto any host:

- **GitHub Pages**: push `dist/` to a `gh-pages` branch (or set the repo to serve `/dist`).
- **Netlify / Vercel**: build command `npm run build`, publish directory `dist`.

## Editing your content

Almost everything lives in two files — no need to touch the 3D code:

- `src/data/profile.js` — name, role, bio, stats, skills, experience, education,
  certificates, and the flagship projects (ReadyMe, PDF RAG, Mask Detection, Cereal Network, VR research).
- `src/data/repos.json` — cached GitHub snapshot (the live API refreshes this on load automatically).

Other useful spots:

- `src/sections.js` — the order of sections and which particle shape each one morphs into.
- `src/three/targets.js` — the particle shape generators (galaxy, net, body, tornado, iris, …).
- `src/three/ParticleField.jsx` — the shader, morphing, and cursor-gravity logic.
- `tailwind.config.js` / `src/index.css` — colors and the neon theme.

## Performance

Particle count auto-scales by device: 78k (desktop) / 42k (low-core) / 16k (mobile, bloom off).
Respects `prefers-reduced-motion`. Holds 60fps on desktop.

---

Ajeet Singh · AI / ML Engineer · [github.com/AjeetSingh21](https://github.com/AjeetSingh21)
