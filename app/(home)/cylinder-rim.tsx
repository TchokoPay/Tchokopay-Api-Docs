/**
 * The rim, sitting out beyond the dots.
 *
 * A single ellipse, far wider than it is tall. A circle drawn round the same
 * centre would just be a second ring; flattened like this it reads as a circle
 * seen at a shallow angle, which is what turns the dot field's hollow into the
 * mouth of something with depth rather than a hole in a flat plane.
 *
 * Its far left and right are faded out in CSS, so what survives is the bend at
 * the top and the bottom — the two arcs the eye needs — without the closed
 * sides that would snap it back to being a ring.
 *
 * Geometry only; stroke, size and placement live in `.hero-rim`.
 */
export function CylinderRim({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-500 -500 1000 1000"
      fill="none"
      aria-hidden
      className={className}
    >
      <ellipse cx="0" cy="0" rx="470" ry="188" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
