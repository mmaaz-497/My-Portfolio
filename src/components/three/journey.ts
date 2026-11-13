// The scroll journey: one target pose for the AI core per page section.
// Scene components read the damped `pose` every frame.

export interface Pose {
  x: number;
  y: number;
  z: number;
  scale: number;
  /** Perceived brightness of the core and its network, 0..1. */
  glow: number;
  /** How far the agent nodes fan out from the core. */
  spread: number;
  /** Visibility of the skill-icon rings, 0..1. */
  orbit: number;
  /** 0 = scattered particle field, 1 = particles gathered into a vertical stream. */
  stream: number;
  /** Lean of the whole assembly around the view axis, in radians. */
  roll: number;
}

// Order matches SECTION_IDS in sceneStore.ts.
// `spread` is kept small where the core sits far back: the nodes orbit at up
// to ~2.65 * scale * (1 + spread) units, and must never reach the camera.
const POSES: Pose[] = [
  /* hero           */ { x: 1.95, y: 0.05, z: 0, scale: 1.2, glow: 1, spread: 0, orbit: 0, stream: 0, roll: 0 },
  /* about          */ { x: 3.3, y: 1.2, z: -3.5, scale: 1.0, glow: 0.58, spread: 0.2, orbit: 0, stream: 0, roll: -0.3 },
  /* skills         */ { x: 2.0, y: -0.1, z: 0, scale: 0.8, glow: 0.95, spread: 0, orbit: 1, stream: 0, roll: 0 },
  /* services       */ { x: 0, y: 0.4, z: -5.5, scale: 1.7, glow: 0.4, spread: 0.5, orbit: 0, stream: 0, roll: 0.35 },
  /* projects       */ { x: 0, y: -0.6, z: -6.5, scale: 2.1, glow: 0.36, spread: 0.35, orbit: 0, stream: 0, roll: -0.2 },
  /* experience     */ { x: 3.6, y: -0.4, z: -4.5, scale: 1.1, glow: 0.46, spread: 0.3, orbit: 0, stream: 1, roll: 0.25 },
  /* certifications */ { x: -3.4, y: 0.8, z: -3.5, scale: 1.0, glow: 0.48, spread: 0.3, orbit: 0, stream: 0, roll: -0.3 },
  /* contact        */ { x: 0, y: -0.4, z: -2.6, scale: 1.5, glow: 0.52, spread: 0.25, orbit: 0, stream: 0, roll: 0 },
];

const KEYS = Object.keys(POSES[0]) as (keyof Pose)[];

/** The pose currently on screen, eased toward the target each frame. */
export const pose: Pose = { ...POSES[0] };

const target: Pose = { ...POSES[0] };
const smoothstep = (t: number) => t * t * (3 - 2 * t);

// Where the core rests during the skills section when the icon orbit is not
// shown (low-power devices): a dim backdrop instead of a centrepiece.
const SKILLS_INDEX = 2;
const SKILLS_BACKDROP: Pose = { x: 3.4, y: 1.0, z: -4, scale: 1.0, glow: 0.45, spread: 0.3, orbit: 0, stream: 0, roll: 0 };

/**
 * Writes the target pose for a fractional section index into `target`.
 * `wide` is 0 on portrait phones and 1 on desktop: narrow screens have no free
 * side column, so the core retreats to the top-right corner, further back and
 * dimmer, where it cannot sit behind body text.
 */
export function sampleTarget(section: number, wide: number, orbiting: boolean): Pose {
  const clamped = Math.min(Math.max(section, 0), POSES.length - 1);
  const index = Math.min(Math.floor(clamped), POSES.length - 2);
  const t = smoothstep(clamped - index);
  const at = (i: number) => (i === SKILLS_INDEX && !orbiting ? SKILLS_BACKDROP : POSES[i]);
  const a = at(index);
  const b = at(index + 1);
  for (const key of KEYS) target[key] = a[key] + (b[key] - a[key]) * t;

  const narrow = 1 - wide;
  target.x = target.x * wide + 1.3 * narrow;
  target.y += 2.5 * narrow;
  target.z -= 2.5 * narrow;
  target.scale *= 1 - 0.3 * narrow;
  target.glow *= 1 - 0.25 * narrow;
  target.orbit *= wide;
  return target;
}

/** Frame-rate independent easing of `pose` toward `next`. */
export function easePose(next: Pose, delta: number) {
  const k = 1 - Math.exp(-3.2 * delta);
  for (const key of KEYS) pose[key] += (next[key] - pose[key]) * k;
}
