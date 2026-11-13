'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { frame, type Theme } from './sceneStore';

// Height of the column the shards travel through; they wrap from top to bottom.
const COLUMN = 18;

const PALETTE: Record<Theme, { body: string; key: string; fill: string; emissive: string }> = {
  dark: { body: '#1a2d36', key: '#7df9ff', fill: '#8b7cff', emissive: '#00262b' },
  light: { body: '#cfe7ef', key: '#ffffff', fill: '#7fd0e0', emissive: '#000000' },
};

// Deterministic pseudo-random so the layout is identical on every visit.
const rand = (seed: number) => {
  const x = Math.sin(seed * 91.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Faceted solids drifting through the middle distance. They move up as the
 * page scrolls, faster than the page itself would suggest for their depth, so
 * every section has solid 3D objects passing behind its panels even while the
 * core sits far back.
 */
export default function Shards({ theme, count }: { theme: Theme; count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const fillLight = useRef<THREE.DirectionalLight>(null);

  const { shards, dummy } = useMemo(
    () => ({
      shards: Array.from({ length: count }, (_, i) => {
        // Kept out of the centre column, where the page content is densest.
        const side = i % 2 ? 1 : -1;
        return {
          x: side * (2.2 + rand(i + 1) * 7.5),
          y: (rand(i + 11) - 0.5) * COLUMN,
          z: -2.5 - rand(i + 21) * 8.5,
          scale: 0.1 + rand(i + 31) * 0.3,
          spin: (rand(i + 41) - 0.5) * 0.5,
          tumble: (rand(i + 51) - 0.5) * 0.4,
          phase: rand(i + 61) * Math.PI * 2,
          // Nearer shards travel further per section scrolled: parallax.
          travel: 0.9 + rand(i + 71) * 1.3,
        };
      }),
      dummy: new THREE.Object3D(),
    }),
    [count],
  );

  useEffect(() => {
    const palette = PALETTE[theme];
    material.current?.color.set(palette.body);
    material.current?.emissive.set(palette.emissive);
    keyLight.current?.color.set(palette.key);
    fillLight.current?.color.set(palette.fill);
  }, [theme]);

  useFrame((state) => {
    const instanced = mesh.current;
    if (!instanced) return;
    const t = state.clock.elapsedTime;
    shards.forEach((shard, i) => {
      const y = shard.y + frame.section * shard.travel + t * 0.04;
      // Wrap inside the column, which is taller than the view at every depth.
      const wrapped = ((((y + COLUMN / 2) % COLUMN) + COLUMN) % COLUMN) - COLUMN / 2;
      dummy.position.set(shard.x + Math.sin(t * 0.2 + shard.phase) * 0.25, wrapped, shard.z);
      dummy.rotation.set(shard.phase + t * shard.tumble, shard.phase * 2 + t * shard.spin, 0);
      dummy.scale.setScalar(shard.scale);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
    });
    instanced.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <ambientLight intensity={theme === 'dark' ? 0.25 : 0.9} />
      <directionalLight ref={keyLight} position={[-4, 6, 5]} intensity={theme === 'dark' ? 2.2 : 1.6} />
      <directionalLight ref={fillLight} position={[6, -3, 4]} intensity={theme === 'dark' ? 1.4 : 0.7} />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial ref={material} flatShading roughness={0.38} metalness={0.25} />
      </instancedMesh>
    </>
  );
}
