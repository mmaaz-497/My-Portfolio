'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { frame, type Theme } from './sceneStore';
import { pose } from './journey';

// Simplex 3D noise (Ian McEwan / Ashima Arts, MIT licence).
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${NOISE}
float field(vec3 p) {
  return snoise(p * 1.35 + uTime * 0.22) + snoise(p * 3.4 - uTime * 0.35) * 0.3;
}
void main() {
  // The mesh is a unit sphere, so the normal is also the position.
  vNoise = field(position);
  vec3 displaced = position + normal * vNoise * uAmp;

  // The surface normal has to follow the bumps, or the lighting would shade a
  // smooth ball. Two nearby points on the surface give the true slope.
  vec3 axis = abs(normal.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 t1 = normalize(cross(axis, normal));
  vec3 t2 = cross(normal, t1);
  vec3 n1 = normalize(position + t1 * 0.04);
  vec3 n2 = normalize(position + t2 * 0.04);
  vec3 p1 = n1 * (1.0 + field(n1) * uAmp);
  vec3 p2 = n2 * (1.0 + field(n2) * uAmp);
  vec3 bumped = normalize(cross(p1 - displaced, p2 - displaced));

  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vNormal = normalize(normalMatrix * bumped);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const fragmentShader = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uAccent;
uniform vec3 uAccent2;
uniform vec3 uAccent3;
uniform vec3 uTint;
uniform float uGlow;
uniform float uLight;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
// Lights are fixed in view space: a key light up and to the left, a fill from
// the lower right. They give the core a lit side and a shaded side.
const vec3 KEY = vec3(-0.48, 0.66, 0.58);
const vec3 FILL = vec3(0.72, -0.42, 0.55);
void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  // Clamped on both sides: interpolation can push the dot product a hair past
  // 1, and pow() of a negative number is NaN, which bloom would then smear
  // across the whole frame.
  float facing = clamp(dot(N, V), 0.0, 1.0);
  float fresnel = pow(1.0 - facing, 2.2);
  // uGlow is a perceived brightness; shading maths here is linear-light.
  float glow = pow(uGlow, 2.2);
  // Thin contour lines that follow the noise field, like a living circuit.
  float band = smoothstep(0.43, 0.5, abs(fract(vNoise * 4.0 + uTime * 0.04) - 0.5));

  float key = clamp(dot(N, KEY), 0.0, 1.0);
  float fill = clamp(dot(N, FILL), 0.0, 1.0);
  float spec = pow(clamp(dot(N, normalize(KEY + V)), 0.0, 1.0), 90.0);

  // The rim shifts between the three brand colours across the surface.
  float shift = 0.5 + 0.5 * sin(vNoise * 2.6 + uTime * 0.25);
  vec3 rim = mix(mix(uAccent2, uAccent, fresnel), uAccent3, shift * 0.38);

  // Dark theme: a dark glossy body, lit by the key and fill, with an emissive
  // rim (values above 1 feed bloom).
  vec3 dark = uBase
    + uAccent2 * key * 0.2 * glow
    + uAccent3 * fill * 0.16 * glow
    + rim * fresnel * 1.9 * glow
    + uAccent * band * 0.45 * glow
    + vec3(0.8, 1.0, 1.0) * spec * 0.65 * glow;

  // Light theme: a tinted glassy body with darker edges and contour lines,
  // shaded by the same lights, fading into the page as the glow drops.
  float edge = pow(1.0 - facing, 1.3);
  vec3 body = mix(uTint, rim, clamp(edge * 0.9 + band * 0.55, 0.0, 1.0));
  body *= 0.8 + key * 0.3;
  body += vec3(1.0) * spec * 0.4;
  vec3 light = mix(uBase, body, uGlow);
  gl_FragColor = vec4(mix(dark, light, uLight), 1.0);
  #include <colorspace_fragment>
}`;

const PALETTE: Record<Theme, { base: string; accent: string; accent2: string; accent3: string; tint: string }> = {
  dark: { base: '#05090b', accent: '#00f5ff', accent2: '#0077ff', accent3: '#8b7cff', tint: '#05090b' },
  light: { base: '#f3f6f9', accent: '#007c8a', accent2: '#22a7c3', accent3: '#6a55e0', tint: '#b4dde8' },
};

// Three thin rings around the core, each on its own axis, like a gyroscope.
const RINGS = [
  { radius: 1.58, tilt: [1.25, 0.0, 0.3], speed: 0.22 },
  { radius: 1.7, tilt: [0.5, 0.9, -0.4], speed: -0.16 },
  { radius: 1.84, tilt: [-0.7, 0.2, 1.1], speed: 0.11 },
] as const;

export default function AICore({ theme, detail }: { theme: Theme; detail: number }) {
  const core = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const shell = useRef<THREE.Mesh>(null);
  const shellMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const ringMaterials = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const energy = useRef(0);
  const lastPointer = useRef({ x: 0, y: 0 });

  // Initial values only. react-three-fiber copies this object onto the
  // material, so per-frame updates must go to `material.current.uniforms`.
  const initialUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.16 },
      uGlow: { value: 1 },
      uLight: { value: 0 },
      uBase: { value: new THREE.Color() },
      uAccent: { value: new THREE.Color() },
      uAccent2: { value: new THREE.Color() },
      uAccent3: { value: new THREE.Color() },
      uTint: { value: new THREE.Color() },
    }),
    [],
  );

  // Colours change only with the theme, so they are set here, not every frame.
  useEffect(() => {
    const palette = PALETTE[theme];
    const uniforms = material.current?.uniforms;
    if (uniforms) {
      uniforms.uBase.value.set(palette.base);
      uniforms.uAccent.value.set(palette.accent);
      uniforms.uAccent2.value.set(palette.accent2);
      uniforms.uAccent3.value.set(palette.accent3);
      uniforms.uTint.value.set(palette.tint);
      uniforms.uLight.value = theme === 'light' ? 1 : 0;
    }
    shellMaterial.current?.color.set(palette.accent);
    ringMaterials.current.forEach((ring) => ring?.color.set(palette.accent));
  }, [theme]);

  useFrame((state, delta) => {
    const uniforms = material.current?.uniforms;
    if (!uniforms) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uGlow.value = pose.glow;

    // Pointer movement injects energy that decays, so the surface ripples
    // harder while the visitor moves the mouse and settles when they stop.
    const dx = frame.pointerX - lastPointer.current.x;
    const dy = frame.pointerY - lastPointer.current.y;
    lastPointer.current.x = frame.pointerX;
    lastPointer.current.y = frame.pointerY;
    energy.current = Math.min(energy.current + Math.hypot(dx, dy) * 1.5, 1);
    energy.current *= Math.exp(-1.6 * delta);
    uniforms.uAmp.value = 0.15 + energy.current * 0.22;

    if (core.current) {
      core.current.rotation.y += delta * 0.12;
      core.current.rotation.x += (frame.pointerY * 0.35 - core.current.rotation.x) * Math.min(delta * 2, 1);
      core.current.rotation.z += (-frame.pointerX * 0.2 - core.current.rotation.z) * Math.min(delta * 2, 1);
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.08;
      shell.current.rotation.x += delta * 0.04;
    }
    if (shellMaterial.current) {
      shellMaterial.current.opacity = (theme === 'light' ? 0.22 : 0.14) * pose.glow;
    }
    rings.current.forEach((ring, i) => {
      if (ring) ring.rotation.z += delta * RINGS[i].speed;
    });
    const ringOpacity = (theme === 'light' ? 0.5 : 0.6) * pose.glow;
    ringMaterials.current.forEach((ring) => {
      if (ring) ring.opacity = ringOpacity;
    });
  });

  return (
    <>
      <mesh ref={core}>
        <icosahedronGeometry args={[1, detail]} />
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={initialUniforms}
        />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshBasicMaterial ref={shellMaterial} wireframe transparent depthWrite={false} toneMapped={false} />
      </mesh>
      {RINGS.map((ring, i) => (
        <group key={ring.radius} rotation={[ring.tilt[0], ring.tilt[1], ring.tilt[2]]}>
          <mesh
            ref={(node) => {
              rings.current[i] = node;
            }}
          >
            <torusGeometry args={[ring.radius, 0.007, 6, 160]} />
            <meshBasicMaterial
              ref={(node) => {
                ringMaterials.current[i] = node;
              }}
              transparent
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}
