'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * The name, at the size of the page.
 *
 * It sits where the page ends: everything above is the product explained, and
 * this is the thing doing the explaining.
 *
 * Drawn as SVG text with `textLength` rather than sized in viewport units,
 * because a font-size guess only spans the viewport at the width you guessed
 * it for — every other screen leaves a gap or overflows. `lengthAdjust="spacing"`
 * makes it exact at any width and only touches the tracking, so the letterforms
 * themselves stay untouched.
 *
 * That also makes the scroll gesture honest: the tracking is already the thing
 * holding the name to the page, so opening and closing it is the one movement
 * this element has — and it is the only one. A fade rode along here for a
 * while and had to go: it said the same thing less well, and because its
 * starting value is written into the markup, the name rendered washed out for
 * anyone whose browser never ran the scroll handler.
 */
export function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  // Starts slightly open, closes as it arrives. A few points of tracking is the
  // whole gesture — at this size, that is plenty.
  const textLength = useTransform(scrollYProgress, [0, 1], [1240, 1200]);

  return (
    <div ref={ref} className="px-4 pt-12 pb-6 sm:px-6 sm:pt-16">
      <svg
        viewBox="0 0 1200 250"
        className="text-fd-foreground block w-full"
        aria-label="TchokoPay"
        role="img"
      >
        <motion.text
          x="600"
          y="196"
          textAnchor="middle"
          textLength={still ? 1200 : textLength}
          lengthAdjust="spacing"
          fontSize="248"
          fontWeight="800"
          fill="currentColor"
          className="font-sans"
        >
          TchokoPay
        </motion.text>
      </svg>
    </div>
  );
}
