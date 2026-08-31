'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useId, useState, type RefObject } from 'react';

/**
 * A line between two elements, with a pulse of light travelling along it.
 *
 * The geometry cannot be written down ahead of time — it depends on where the
 * two nodes actually land, which depends on the container's width. So the path
 * is measured from the live boxes and re-measured whenever the container
 * resizes. That also means the beams do not exist until scripting runs; the
 * nodes they connect are ordinary DOM and render regardless, so what a reader
 * without JavaScript loses is the wiring, not the content.
 *
 * There is deliberately no `reverse` prop. The gradient sweeps left to right in
 * screen space whatever order the path was declared in, so the pulse's
 * direction is a property of the LAYOUT: put the source column on the left and
 * it flows outward, mirror the columns and the same beams flow the other way.
 * Reversing the sweep as well as mirroring the layout flips it twice and sends
 * the money back where it came from.
 */
export interface AnimatedBeamProps {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  /** Bow in the line, in px. Positive lifts the middle. */
  curvature?: number;
  duration?: number;
  delay?: number;
  pathWidth?: number;
  className?: string;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  duration = 3,
  delay = 0,
  pathWidth = 1.4,
}: AnimatedBeamProps) {
  const id = useId();
  const still = useReducedMotion();
  const [path, setPath] = useState('');
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const from = fromRef.current;
      const to = toRef.current;
      if (!from || !to) return;

      const box = container.getBoundingClientRect();
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();

      setSize({ width: box.width, height: box.height });

      const startX = a.left - box.left + a.width / 2;
      const startY = a.top - box.top + a.height / 2;
      const endX = b.left - box.left + b.width / 2;
      const endY = b.top - box.top + b.height / 2;

      // The control point sits at the START's height, not the chord's midpoint.
      // On the midpoint a quadratic degenerates to a straight line; held level
      // with the origin it bows, which is what makes a fan of these read as
      // lines converging rather than a starburst.
      setPath(
        `M ${startX},${startY} Q ${(startX + endX) / 2},${startY - curvature} ${endX},${endY}`,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  // The pulse is a narrow gradient swept across the line's own bounding box.
  const sweep = { x1: ['-25%', '100%'], x2: ['0%', '125%'] };

  return (
    <svg
      fill="none"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      className="pointer-events-none absolute top-0 left-0 transform-gpu"
      aria-hidden
    >
      <path
        d={path}
        stroke="currentColor"
        strokeOpacity={still ? 0.28 : 0.16}
        strokeWidth={pathWidth}
        strokeLinecap="round"
      />
      {!still && (
        <>
          <path d={path} stroke={`url(#${id})`} strokeWidth={pathWidth} strokeLinecap="round" />
          <defs>
            <motion.linearGradient
              id={id}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: sweep.x1[0], x2: sweep.x2[0] }}
              animate={{ x1: sweep.x1, x2: sweep.x2 }}
              transition={{
                delay,
                duration,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 0,
              }}
            >
              <stop stopColor="var(--color-fd-primary)" stopOpacity="0" />
              <stop offset="45%" stopColor="var(--color-fd-primary)" stopOpacity="0.95" />
              <stop offset="55%" stopColor="var(--color-fd-primary)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--color-fd-primary)" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
}
