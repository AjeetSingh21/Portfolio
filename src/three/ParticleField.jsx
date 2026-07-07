import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { SECTIONS } from '../sections'
import { store } from '../lib/store'
import { buildTargets } from './targets'

const vertex = `
uniform float uProgress;
uniform float uTime;
uniform float uPress;
uniform float uSize;
uniform float uDpr;
uniform vec3 uMouse;
attribute vec3 aA;
attribute vec3 aB;
attribute float aRand;
varying float vGlow;
vec3 wobble(vec3 p){
  return vec3(
    sin(p.y*0.018 + uTime*0.7 + aRand*6.2831),
    sin(p.z*0.015 + uTime*0.6 + aRand*3.1415),
    sin(p.x*0.020 + uTime*0.8 + aRand*1.5707)
  );
}
void main(){
  float t = smoothstep(0.0, 1.0, uProgress);
  vec3 pos = mix(aA, aB, t);
  float swirl = sin(uProgress * 3.14159265);
  pos += wobble(pos) * swirl * 30.0 * (0.4 + aRand);
  pos += wobble(pos.zxy) * 2.2;
  vec2 d = pos.xy - uMouse.xy;
  float dist = length(d);
  float infl = smoothstep(160.0, 0.0, dist);
  float dir = uPress > 0.5 ? -1.0 : 1.0;
  pos.xy += normalize(d + vec2(0.0001)) * infl * dir * (uPress > 0.5 ? 110.0 : 52.0);
  pos.z += infl * uPress * 60.0;
  vGlow = swirl * 0.5 + infl * (0.7 + uPress) + 0.12;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uDpr * (320.0 / max(-mv.z, 1.0));
}
`

const fragment = `
precision highp float;
varying float vGlow;
uniform vec3 cLow;
uniform vec3 cMid;
uniform vec3 cHot;
uniform vec3 cWhite;
void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv);
  if (r > 0.5) discard;
  float a = smoothstep(0.5, 0.05, r);
  float g = clamp(vGlow, 0.0, 1.0);
  vec3 col = mix(cLow, cMid, smoothstep(0.0, 0.45, g));
  col = mix(col, cHot, smoothstep(0.45, 0.78, g));
  col = mix(col, cWhite, smoothstep(0.78, 1.0, g));
  gl_FragColor = vec4(col, a);
}
`

function Points({ count, onReady }) {
  const matRef = useRef()
  const pointsRef = useRef()
  const buffers = useRef(null)
  const lastStage = useRef(-1)
  const camMouse = useRef(new THREE.Vector3(9999, 9999, 0))
  const { camera } = useThree()
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
  const ray = useMemo(() => new THREE.Raycaster(), [])

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uPress: { value: 0 },
      uSize: { value: 2.6 },
      uDpr: { value: Math.min(window.devicePixelRatio || 1, 1.8) },
      uMouse: { value: new THREE.Vector3(9999, 9999, 0) },
      cLow: { value: new THREE.Color('#5B6CFF') },
      cMid: { value: new THREE.Color('#16E0FF') },
      cHot: { value: new THREE.Color('#FF2BD6') },
      cWhite: { value: new THREE.Color('#FFFFFF') },
    }),
    []
  )

  // Build the geometry imperatively so custom attributes are guaranteed to bind.
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const aA = new Float32Array(count * 3)
    const aB = new Float32Array(count * 3)
    const aRand = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 230 + Math.random() * 240
      aA[i * 3] = Math.cos(a) * r
      aA[i * 3 + 1] = (Math.random() - 0.5) * 500
      aA[i * 3 + 2] = Math.sin(a) * r
      aRand[i] = Math.random()
    }
    aB.set(aA)
    g.setAttribute('position', new THREE.BufferAttribute(aA.slice(), 3))
    g.setAttribute('aA', new THREE.BufferAttribute(aA, 3))
    g.setAttribute('aB', new THREE.BufferAttribute(aB, 3))
    g.setAttribute('aRand', new THREE.BufferAttribute(aRand, 1))
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1200)
    return g
  }, [count])

  useEffect(() => {
    let alive = true
    buildTargets(count).then((bufs) => {
      if (!alive) return
      buffers.current = bufs
      geometry.attributes.aA.array.set(bufs[0])
      geometry.attributes.aB.array.set(bufs[Math.min(1, bufs.length - 1)])
      geometry.attributes.aA.needsUpdate = true
      geometry.attributes.aB.needsUpdate = true
      lastStage.current = 0
      store.ready = true
      onReady && onReady()
    })
    return () => {
      alive = false
    }
  }, [count, onReady, geometry])

  useFrame((state, delta) => {
    const m = matRef.current
    if (!m) return
    m.uniforms.uTime.value += Math.min(delta, 0.05)

    const maxStage = SECTIONS.length - 1
    const sf = store.stageF
    const i = Math.min(Math.floor(sf), maxStage - 1)
    const f = sf - i

    if (buffers.current && i !== lastStage.current) {
      geometry.attributes.aA.array.set(buffers.current[i])
      geometry.attributes.aB.array.set(buffers.current[Math.min(i + 1, maxStage)])
      geometry.attributes.aA.needsUpdate = true
      geometry.attributes.aB.needsUpdate = true
      lastStage.current = i
    }
    m.uniforms.uProgress.value += (f - m.uniforms.uProgress.value) * Math.min(1, delta * 6)
    m.uniforms.uPress.value += (store.press - m.uniforms.uPress.value) * Math.min(1, delta * 8)

    if (store.ndc.x > -1.5) {
      ray.setFromCamera(store.ndc, camera)
      const hit = ray.ray.intersectPlane(plane, camMouse.current)
      if (hit) m.uniforms.uMouse.value.copy(camMouse.current)
    } else {
      m.uniforms.uMouse.value.set(9999, 9999, 0)
    }

    if (pointsRef.current) pointsRef.current.rotation.y = Math.sin(m.uniforms.uTime.value * 0.05) * 0.16
  })

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ParticleField({ onReady }) {
  const [count] = useState(() => {
    const mobile = window.innerWidth < 768
    const weak = (navigator.hardwareConcurrency || 4) <= 4
    return mobile ? 16000 : weak ? 42000 : 78000
  })
  const lowFx = count <= 16000

  return (
    <Canvas
      camera={{ position: [0, 0, 560], fov: 50, near: 1, far: 4000 }}
      dpr={[1, 1.8]}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <color attach="background" args={['#04040b']} />
      <Points count={count} onReady={onReady} />
      {!lowFx && (
        <EffectComposer>
          <Bloom intensity={1.1} luminanceThreshold={0.02} luminanceSmoothing={0.6} radius={0.75} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  )
}
