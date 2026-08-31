/**
 * A field of dots, tiled with an SVG pattern.
 *
 * The id is fixed rather than generated, because the hero uses exactly one of
 * these. That keeps it a server component — `useId` would force a client
 * boundary, and a decorative background has no business shipping JavaScript.
 * A second instance on the same page would need the id back.
 *
 * How it is shaped and how it moves both live in `.hero-dots` in global.css.
 */
export function DotPattern({
  width = 22,
  height = 22,
  cx = 1,
  cy = 1,
  cr = 1,
  className = "",
}: {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern
          id="hero-dot-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill="url(#hero-dot-pattern)"
      />
    </svg>
  );
}
