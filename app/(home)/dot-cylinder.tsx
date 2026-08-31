/**
 * The mouth of a cylinder, made only of dots.
 *
 * No outline anywhere: a drawn ellipse reads as a line round the headline, not
 * as depth. The perspective is entirely in how the dots are arranged, and it
 * comes from three things growing together as the rings go outwards —
 *
 *   · the radius climbs geometrically, so each gap is wider than the last
 *     rather than repeating, which is what a receding surface does;
 *   · the dots get larger, because nearer things are bigger;
 *   · the angular count is held fixed, so that widening radius spreads them
 *     apart on its own.
 *
 * A tiled grid can do none of that — every dot the same size, every gap the
 * same width — which is why masking one into a ring only ever produced a flat
 * plane with a hole in it.
 *
 * The rings are circles, not ellipses: this is the tube seen straight down its
 * axis, so its mouth is round.
 *
 * Fading is per-ring rather than by a mask — nothing at all in the hollow, up
 * over the first few rings, out across the outer half — so the field has no
 * edge at either end for the eye to catch.
 *
 * Alternate rings are offset half a step. Without it a fixed angular count
 * lines the dots up into spokes and the whole thing reads as a starburst.
 *
 * Every value comes from constants, so server and client render the same thing
 * and this ships no JavaScript.
 */

const RINGS = 18;
/** Innermost ring, in viewBox units. The hollow is whatever sits inside it. */
const INNER_RADIUS = 38;
/** >1, so each ring stands further from the last than the one before it. */
const GROWTH = 1.15;
/** Fixed on purpose: constant count + growing radius = gaps that open. */
const DOTS_PER_RING = 34;

function ring(i: number) {
  const t = i / (RINGS - 1);
  return {
    radius: INNER_RADIUS * GROWTH ** i,
    dot: 0.8 + i * 0.13,
    // Up over the first fifth, out across the whole outer half.
    opacity: Math.min(1, t / 0.18) * Math.min(1, (1 - t) / 0.5),
    offset: (i % 2) * (Math.PI / DOTS_PER_RING),
  };
}

export function DotCylinder({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-500 -500 1000 1000" aria-hidden className={className}>
      {Array.from({ length: RINGS }, (_, i) => {
        const { radius, dot, opacity, offset } = ring(i);
        if (opacity <= 0.001) return null;
        return (
          <g key={i} opacity={opacity.toFixed(3)}>
            {Array.from({ length: DOTS_PER_RING }, (_, j) => {
              const angle = (j / DOTS_PER_RING) * Math.PI * 2 + offset;
              return (
                <circle
                  key={j}
                  cx={(Math.cos(angle) * radius).toFixed(2)}
                  cy={(Math.sin(angle) * radius).toFixed(2)}
                  r={dot.toFixed(2)}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
