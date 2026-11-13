'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Theme } from './sceneStore';
import { pose } from './journey';

const NODE_COUNT = 12;
// Every node links to the core; every second node also links to its neighbour.
const SEGMENTS = NODE_COUNT + NODE_COUNT / 2;

interface Orbit {
  radius: number;
  speed: number;
  phase: number;
  incline: number;
  azimuth: number;
}

// Deterministic pseudo-random so the layout is identical on every visit.
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const ORBITS: Orbit[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
  radius: 1.75 + rand(i + 1) * 0.9,
  speed: (0.12 + rand(i + 11) * 0.2) * (i % 2 ? 1 : -1),
  phase: rand(i + 21) * Math.PI * 2,
  incline: (rand(i + 31) - 0.5) * 1.6,
  azimuth: rand(i + 41) * Math.PI * 2,
}));

const COLORS: Record<Theme, string> = { dark: '#00f5ff', light: '#007c8a' };

/** "Agents" orbiting the core, wired to it by lines with pulses travelling out. */
export default function AgentNetwork({ theme }: { theme: Theme }) {
  const nodes = useRef<THREE.InstancedMesh>(null);
  const lineMaterial = useRef<THREE.LineBasicMaterial>(null);
  const nodeMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const pulseMaterial = useRef<THREE.PointsMaterial>(null);

  const { lineGeometry, pulseGeometry, positions, dummy } = useMemo(() => {
    const line = new THREE.BufferGeometry();
    line.setAttribute('position', new THREE.BufferAttribute(new Float32Array(SEGMENTS * 6), 3));
    const pulse = new THREE.BufferGeometry();
    pulse.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NODE_COUNT * 3), 3));
    return {
      lineGeometry: line,
      pulseGeometry: pulse,
      positions: Array.from({ length: NODE_COUNT }, () => new THREE.Vector3()),
      dummy: new THREE.Object3D(),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const spread = 1 + pose.spread;
    const line = lineGeometry.attributes.position as THREE.BufferAttribute;
    const pulse = pulseGeometry.attributes.position as THREE.BufferAttribute;

    ORBITS.forEach((orbit, i) => {
      const angle = orbit.phase + t * orbit.speed;
      const r = orbit.radius * spread;
      const flatX = Math.cos(angle) * r;
      const flatZ = Math.sin(angle) * r;
      const y = flatZ * Math.sin(orbit.incline);
      const z = flatZ * Math.cos(orbit.incline);
      const p = positions[i].set(
        flatX * Math.cos(orbit.azimuth) - z * Math.sin(orbit.azimuth),
        y,
        flatX * Math.sin(orbit.azimuth) + z * Math.cos(orbit.azimuth),
      );

      dummy.position.copy(p);
      dummy.updateMatrix();
      nodes.current?.setMatrixAt(i, dummy.matrix);

      // Line from the core surface to the node.
      const inv = 1 / p.length();
      line.setXYZ(i * 2, p.x * inv, p.y * inv, p.z * inv);
      line.setXYZ(i * 2 + 1, p.x, p.y, p.z);

      // Pulse travelling outward along that line.
      const k = (t * 0.35 + orbit.phase) % 1;
      const s = inv + (1 - inv) * k;
      pulse.setXYZ(i, p.x * s, p.y * s, p.z * s);
    });

    for (let i = 0; i < NODE_COUNT / 2; i++) {
      const a = positions[i * 2];
      const b = positions[(i * 2 + 3) % NODE_COUNT];
      const offset = (NODE_COUNT + i) * 2;
      line.setXYZ(offset, a.x, a.y, a.z);
      line.setXYZ(offset + 1, b.x, b.y, b.z);
    }

    line.needsUpdate = true;
    pulse.needsUpdate = true;
    if (nodes.current) nodes.current.instanceMatrix.needsUpdate = true;

    const dark = theme === 'dark';
    const glow = pose.glow;
    if (lineMaterial.current) lineMaterial.current.opacity = (dark ? 0.32 : 0.4) * glow;
    if (nodeMaterial.current) nodeMaterial.current.opacity = Math.min(0.12 + glow, 1);
    if (pulseMaterial.current) pulseMaterial.current.opacity = glow;
  });

  // Brighter than 1 in the dark theme so the nodes pick up bloom.
  const color = useMemo(() => new THREE.Color(COLORS[theme]).multiplyScalar(theme === 'dark' ? 1.8 : 1), [theme]);

  return (
    <>
      <instancedMesh ref={nodes} args={[undefined, undefined, NODE_COUNT]} frustumCulled={false}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial ref={nodeMaterial} color={color} transparent toneMapped={false} />
      </instancedMesh>
      <lineSegments geometry={lineGeometry} frustumCulled={false}>
        <lineBasicMaterial ref={lineMaterial} color={COLORS[theme]} transparent depthWrite={false} toneMapped={false} />
      </lineSegments>
      <points geometry={pulseGeometry} frustumCulled={false}>
        <pointsMaterial
          ref={pulseMaterial}
          color={color}
          size={0.07}
          sizeAttenuation
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </points>
    </>
  );
}
