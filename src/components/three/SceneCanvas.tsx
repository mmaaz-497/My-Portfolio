'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { frame, setView } from './sceneStore';
import { useView } from './useView';

// three.js is only downloaded in the browser, after the page is interactive.
const Scene = dynamic(() => import('./Scene'), { ssr: false });

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
}

/**
 * Fixed full-viewport backdrop. Renders the WebGL scene when the device
 * supports it and the visitor has not asked for reduced motion; otherwise the
 * CSS gradient underneath is all that shows.
 */
export default function SceneCanvas() {
  const { enabled, ready, theme, quality } = useView();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canRun = !reducedMotion && hasWebGL();
    const lowPower = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;
    // Without a scene there is nothing to wait for, so the preloader can leave.
    setView({ enabled: canRun, quality: lowPower ? 'low' : 'high', ready: !canRun });

    const onPointerMove = (event: PointerEvent) => {
      // Mouse only: a finger dragging to scroll should not swing the camera.
      if (event.pointerType !== 'mouse') return;
      frame.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      frame.pointerY = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  return (
    <div aria-hidden="true">
      <div className="scene-fallback" />
      {enabled && (
        <div
          className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Scene theme={theme} quality={quality} />
        </div>
      )}
    </div>
  );
}
