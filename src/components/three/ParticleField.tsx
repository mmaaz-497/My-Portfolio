'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Theme } from './sceneStore';
import { pose } from './journey';

const vertexShader = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uFlow;
uniform float uStream;
uniform float uSize;
varying float vAlpha;
varying float vSoft;
void main() {
  vec3 p = position;
  // Endless upward drift, wrapped inside a 18-unit tall column.
  p.y = mod(p.y + uFlow * (0.15 + aSeed * 0.3) + 9.0, 18.0) - 9.0;
  p.x += sin(uTime * 0.3 + aSeed * 40.0) * 0.25;
  // Gather into a narrow vertical stream (used beside the experience timeline).
  p.x = mix(p.x, p.x * 0.07, uStream);
  p.z = mix(p.z, p.z * 0.25 - 2.5, uStream);
  // A few particles are pulled close to the camera and drawn large and faint:
  // out-of-focus specks in the foreground that give the scene depth.
  float near = step(0.972, aSeed);
  p.z = mix(p.z, 1.6 + fract(aSeed * 57.0) * 1.6, near);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * (0.5 + aSeed) / -mv.z * mix(1.0, 4.0, near);
  gl_Position = projectionMatrix * mv;
  // Fade out toward the top and bottom of the column.
  vAlpha = (1.0 - smoothstep(6.0, 9.0, abs(p.y))) * mix(1.0, 0.12, near);
  vSoft = near;
}`;

const fragmentShader = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying float vAlpha;
varying float vSoft;
void main() {
  float d = length(gl_PointCoord - 0.5);
  // Foreground specks are flat discs with a soft edge, like lens bokeh.
  float alpha = (1.0 - smoothstep(mix(0.05, 0.32, vSoft), 0.5, d)) * vAlpha * uOpacity;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(uColor, alpha);
  #include <colorspace_fragment>
}`;

export default function ParticleField({ theme, count }: { theme: Theme; count: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    // Deterministic scatter (no Math.random) so renders are pure and stable.
    const rand = (n: number) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand(i * 3 + 1) - 0.5) * 26;
      positions[i * 3 + 1] = (rand(i * 3 + 2) - 0.5) * 18;
      positions[i * 3 + 2] = -rand(i * 3 + 3) * 14 + 2;
      seeds[i] = rand(i + 0.5);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    return g;
  }, [count]);

  const material = useRef<THREE.ShaderMaterial>(null);

  // Initial values only. react-three-fiber copies this object onto the
  // material, so per-frame updates must go to `material.current.uniforms`.
  const initialUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFlow: { value: 0 },
      uStream: { value: 0 },
      uSize: { value: 60 },
      uOpacity: { value: 0.7 },
      uColor: { value: new THREE.Color() },
    }),
    [],
  );

  useFrame((state, delta) => {
    const uniforms = material.current?.uniforms;
    if (!uniforms) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    // Accumulated rather than time * speed, so changing speed never makes particles jump.
    uniforms.uFlow.value += delta * (1 + pose.stream * 5);
    uniforms.uStream.value = pose.stream;
    uniforms.uSize.value = 60 * state.viewport.dpr * (state.size.height / 900);
    uniforms.uColor.value.set(theme === 'dark' ? '#5ff8ff' : '#007c8a');
    uniforms.uOpacity.value = theme === 'dark' ? 0.7 : 0.45;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        key={theme}
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={initialUniforms}
        transparent
        depthWrite={false}
        blending={theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}
