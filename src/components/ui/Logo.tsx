/**
 * The 2M monogram, drawn from the same stroke paths as design/2m-logo.svg so
 * it does not depend on a font and follows the active theme.
 */
export default function Logo({ size = 44, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="2M monogram"
    >
      <rect x="1" y="1" width="62" height="62" rx="14" fill="var(--card)" stroke="var(--line)" strokeWidth="2" />
      <g fill="none" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 9 24 A 9 9 0 0 1 27 25 L 9 46 L 28.5 46" stroke="var(--accent)" />
        <path d="M 36 46 L 36 18 L 46.5 33 L 57 18 L 57 46" stroke="var(--foreground)" />
      </g>
    </svg>
  );
}
