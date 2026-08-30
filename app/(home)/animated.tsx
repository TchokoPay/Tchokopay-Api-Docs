'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Reveals that cannot hide the page.
 *
 * These were framer-motion components with `initial={{ opacity: 0 }}`, which
 * React renders into the HTML — so the served markup carried `opacity:0` on
 * every headline and card, and the whole page was blank until JavaScript
 * hydrated and animated it back. A screenshot with scripting stalled showed
 * exactly that: nothing but the footer.
 *
 * So the resting state is now visible, always. Entrance motion is a CSS
 * animation running FROM a hidden state to the element's natural one, which
 * means no script has to run for the content to be there. Scroll reveals need
 * an observer, so they are opted into by a `js` class the document only gets
 * when scripting is available — no script, no hiding.
 *
 * `prefers-reduced-motion` is handled in CSS, once, for both.
 */

/** Entrance on load. `delay` is in seconds, to keep call sites readable. */
export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`rise ${className ?? ''}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/**
 * Kept so the hero reads as one group. It no longer orchestrates anything —
 * each child owns its own delay — but grouping them is still what the markup
 * means.
 */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

/** Reveals as it scrolls into view, and is simply present if it cannot. */
export function FadeInView({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Anything already on screen at mount is shown without waiting for a
    // scroll that may never come — a short page must not sit half-hidden.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown ? '' : undefined}
      className={`reveal ${className ?? ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
