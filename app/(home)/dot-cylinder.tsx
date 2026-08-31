/**
 * The mouth of a cylinder, made only of dots.
 *
 * No outline anywhere: a drawn ellipse reads as a line round the headline, not
 * as depth. The perspective is entirely in how the dots are arranged.
 *
 * Going outwards, three things grow together — the radius climbs
 * geometrically, so each gap is wider than the last rather than repeating; the
 * dots get larger, because nearer things are; and the angular count is held
 * fixed, so that widening radius spreads them apart on its own. A tiled grid
 * can do none of that, which is why masking one into a ring only ever gave a
 * flat plane with a hole in it.
 *
 * Then the bend. The inner rings are true circles — the tube seen straight
 * down its axis — and they hold that shape until close to the outer edge,
 * where they squash hard and quickly onto the horizontal. That is the wall
 * turning over and running flat towards the reader, and it is why the flatten
 * is late and steep rather than gradual: a gentle taper reads as an oval, a
 * late one reads as a fold.
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

const RINGS = 22;
/** Innermost ring, in viewBox units. The hollow is whatever sits inside it. */
const INNER_RADIUS = 34;
/** >1, so each ring stands further from the last than the one before it. */
const GROWTH = 1.13;
/** Fixed on purpose: constant count + growing radius = gaps that open. */
const DOTS_PER_RING = 40;
/** Where the wall starts turning over, as a fraction of the way out. */
const BEND_AT = 0.6;
/** How flat it gets by the last ring. Lower is a harder fold. */
const BEND_TO = 0.22;

function ring(i: number) {
  const t = i / (RINGS - 1);
  const radius = INNER_RADIUS * GROWTH ** i;
  // Circular until BEND_AT, then squashed onto the horizontal — the power is
  // what makes it a fold rather than a taper.
  const bend =
    t < BEND_AT
      ? 1
      : 1 - ((t - BEND_AT) / (1 - BEND_AT)) ** 1.5 * (1 - BEND_TO);
  return {
    rx: radius,
    ry: radius * bend,
    dot: 0.6 + i * 0.075,
    // Up over the first fifth, out across the whole outer half.
    opacity: Math.min(1, t / 0.18) * Math.min(1, (1 - t) / 0.5),
    offset: (i % 2) * (Math.PI / DOTS_PER_RING),
  };
}

export function DotCylinder({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-500 -500 1000 1000" aria-hidden className={className}>
      {Array.from({ length: RINGS }, (_, i) => {
        const { rx, ry, dot, opacity, offset } = ring(i);
        if (opacity <= 0.001) return null;
        return (
          <g key={i} opacity={opacity.toFixed(3)}>
            {Array.from({ length: DOTS_PER_RING }, (_, j) => {
              const angle = (j / DOTS_PER_RING) * Math.PI * 2 + offset;
              return (
                <circle
                  key={j}
                  cx={(Math.cos(angle) * rx).toFixed(2)}
                  cy={(Math.sin(angle) * ry).toFixed(2)}
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
