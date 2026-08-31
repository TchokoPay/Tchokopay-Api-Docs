/**
 * The mouth of a hollow cylinder, drawn in dots.
 *
 * A tiled dot grid with a hole punched in it stays flat however it is masked,
 * because every dot is the same size and the same distance from its neighbours
 * — there is nothing in it for the eye to read as depth. So the rings are
 * drawn explicitly instead, and three things grow together as they go
 * outwards: the radius (geometrically, so the gaps open rather than repeat),
 * the dot size, and the spacing that follows from holding the angular count
 * fixed. That is what perspective looks like down a tube, and it is why this
 * reads as opening toward you rather than lying on the page.
 *
 * The fade is per-ring rather than a mask: it starts at nothing in the hollow,
 * comes up over the first few rings, holds, and goes out again at the rim, so
 * the field has no edge at either end.
 *
 * Alternate rings are offset by half a step. Without that the fixed angular
 * count lines the dots up into spokes and the whole thing reads as a
 * starburst; staggered, it reads as a surface.
 *
 * Everything here is computed from constants, so it renders identically on the
 * server and the client and ships no JavaScript.
 */

const RINGS = 16;
/** Innermost ring, in viewBox units. The hollow is what sits inside it. */
const INNER_RADIUS = 42;
/** >1, so each ring is further from the last than the one before it. */
const GROWTH = 1.18;
/** Held constant on purpose: fixed count + growing radius = opening gaps. */
const DOTS_PER_RING = 30;

function ring(i: number) {
  const t = i / (RINGS - 1);
  const radius = INNER_RADIUS * GROWTH ** i;
  const dot = 0.9 + i * 0.15;
  // Up over the first fifth, then out across the whole outer half, so the
  // field has thinned to nothing well before it reaches the content.
  const opacity = Math.min(1, t / 0.2) * Math.min(1, (1 - t) / 0.55);
  const offset = (i % 2) * (Math.PI / DOTS_PER_RING);
  return { radius, dot, opacity, offset };
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
