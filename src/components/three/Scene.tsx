'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { frame, setView, type Quality, type Theme } from './sceneStore';
import { easePose, pose, sampleTarget } from './journey';
import AICore from './AICore';
import AgentNetwork from './AgentNetwork';
import ParticleField from './ParticleField';
import Shards from './Shards';
import SkillOrbit from './SkillOrbit';

const BACKGROUND: Record<Theme, string> = { dark: '#0a0a0a', light: '#f3f6f9' };

/** Moves the core along the scroll journey and adds pointer parallax to the camera. */
function Rig({ theme, quality }: { theme: Theme; quality: Quality }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Clamp so a long pause (tab switch) does not snap the animation.
    const dt = Math.min(delta, 0.1);
    const aspect = state.size.width / state.size.height;
    const wide = THREE.MathUtils.clamp((aspect - 0.8) / 0.7, 0, 1);
    easePose(sampleTarget(frame.section, wide, quality === 'high'), dt);

    if (group.current) {
      group.current.position.set(pose.x, pose.y + Math.sin(state.clock.elapsedTime * 0.6) * 0.06, pose.z);
      group.current.scale.setScalar(pose.scale);
      group.current.rotation.z = pose.roll;
    }

    const k = 1 - Math.exp(-2.5 * dt);
    state.camera.position.x += (frame.pointerX * 0.35 - state.camera.position.x) * k;
    state.camera.position.y += (frame.pointerY * 0.22 - state.camera.position.y) * k;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <AICore theme={theme} detail={quality === 'high' ? 28 : 14} />
      <AgentNetwork theme={theme} />
      {quality === 'high' && <SkillOrbit />}
    </group>
  );
}

export default function Scene({ theme, quality }: { theme: Theme; quality: Quality }) {
  const high = quality === 'high';

  return (
    <Canvas
      flat
      dpr={high ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0, 0, 6], fov: 42, near: 0.1, far: 60 }}
      gl={{ antialias: high, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        setView({ ready: true });
        // If the GPU drops the context, fall back to the CSS backdrop rather
        // than leaving a frozen canvas on screen.
        gl.domElement.addEventListener('webglcontextlost', () => setView({ enabled: false }), { once: true });
      }}
    >
      <color attach="background" args={[BACKGROUND[theme]]} />
      {/* Drop to the light pipeline if the device cannot hold frame rate. */}
      {high && <PerformanceMonitor onDecline={() => setView({ quality: 'low' })} />}
      <Rig theme={theme} quality={quality} />
      <Shards theme={theme} count={high ? 26 : 9} />
      <ParticleField theme={theme} count={high ? 2200 : 800} />
      {high && theme === 'dark' && (
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.8} luminanceSmoothing={0.2} />
          <Vignette offset={0.25} darkness={0.7} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
