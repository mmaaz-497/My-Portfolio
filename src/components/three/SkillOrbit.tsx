'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { skills, type Skill } from '@/data/skills';
import { pose } from './journey';

const SIZE = 160;

/** Draws one skill icon onto a rounded plate and returns it as a texture. */
function loadPlate(skill: Skill): Promise<THREE.CanvasTexture | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = SIZE;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(null);

      // Slightly grey rather than pure white so the plates stay below the bloom threshold.
      ctx.fillStyle = '#dde5ea';
      ctx.beginPath();
      ctx.roundRect(4, 4, SIZE - 8, SIZE - 8, 36);
      ctx.fill();

      const inset = 36;
      const box = SIZE - inset * 2;
      if (skill.invert) {
        // White artwork: stamp it as a dark silhouette instead.
        const mask = document.createElement('canvas');
        mask.width = mask.height = box;
        const m = mask.getContext('2d');
        if (m) {
          m.drawImage(image, 0, 0, box, box);
          m.globalCompositeOperation = 'source-in';
          m.fillStyle = '#0b1220';
          m.fillRect(0, 0, box, box);
          ctx.drawImage(mask, inset, inset);
        }
      } else {
        ctx.drawImage(image, inset, inset, box, box);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      resolve(texture);
    };
    image.onerror = () => resolve(null);
    image.src = skill.icon;
  });
}

// Two tilted rings; icons alternate between them.
const RINGS = [
  { radius: 1.75, tilt: 0.42, speed: 0.22 },
  { radius: 2.3, tilt: -0.3, speed: -0.16 },
];

export default function SkillOrbit() {
  const [textures, setTextures] = useState<(THREE.CanvasTexture | null)[]>([]);
  const sprites = useRef<(THREE.Sprite | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    let loaded: (THREE.CanvasTexture | null)[] = [];
    Promise.all(skills.map(loadPlate)).then((result) => {
      loaded = result;
      if (cancelled) result.forEach((texture) => texture?.dispose());
      else setTextures(result);
    });
    return () => {
      cancelled = true;
      loaded.forEach((texture) => texture?.dispose());
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const visible = pose.orbit;
    const perRing = skills.length / RINGS.length;
    sprites.current.forEach((sprite, i) => {
      if (!sprite) return;
      sprite.visible = visible > 0.02;
      if (!sprite.visible) return;
      const ring = RINGS[i % RINGS.length];
      const angle = (Math.floor(i / RINGS.length) / perRing) * Math.PI * 2 + t * ring.speed;
      const x = Math.cos(angle) * ring.radius;
      const flatZ = Math.sin(angle) * ring.radius;
      sprite.position.set(x, flatZ * Math.sin(ring.tilt), flatZ * Math.cos(ring.tilt));
      const scale = 0.46 * visible;
      sprite.scale.set(scale, scale, 1);
      (sprite.material as THREE.SpriteMaterial).opacity = visible;
    });
  });

  return (
    <>
      {textures.map((texture, i) =>
        texture ? (
          <sprite
            key={skills[i].name}
            ref={(node) => {
              sprites.current[i] = node;
            }}
            visible={false}
          >
            <spriteMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
          </sprite>
        ) : null,
      )}
    </>
  );
}
