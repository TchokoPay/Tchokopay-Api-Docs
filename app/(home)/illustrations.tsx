'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * The rail.
 *
 * One line, a handset at one end and a merchant at the other, with value
 * moving along it in both directions. It is the whole product in one figure:
 * money in is `collect`, money out is `disburse`, and everything between the
 * two ends is ours.
 *
 * The two travelling tokens are coloured with the actual operator colours —
 * MTN's yellow and Orange's orange — because those are the networks the money
 * really moves on. They are the only place on the page those colours appear.
 */
export function PaymentRail({ className }: { className?: string }) {
  const still = useReducedMotion();

  return (
    <svg
      viewBox="26 62 508 176"
      fill="none"
      className={className}
      role="img"
      aria-label="A payment moving between a customer's phone and a merchant's server."
    >
      <defs>
        <linearGradient id="rail-fade" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.18" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="0.82" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── The handset ─────────────────────────────────────────────── */}
      <g className="text-fd-foreground">
        <rect x="34" y="72" width="96" height="156" rx="14" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
        <rect x="44" y="86" width="76" height="128" rx="6" fill="currentColor" fillOpacity="0.03" />
        <line x1="68" y1="79" x2="96" y2="79" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" />

        {/* The prompt, arriving. */}
        <motion.g
          initial={still ? false : { opacity: 0, y: 6 }}
          animate={still ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect x="54" y="104" width="56" height="8" rx="4" fill="currentColor" fillOpacity="0.14" />
          <rect x="54" y="120" width="38" height="8" rx="4" fill="currentColor" fillOpacity="0.09" />
          <rect x="54" y="150" width="56" height="20" rx="6" className="fill-fd-primary" fillOpacity="0.9" />
          <rect x="66" y="158" width="32" height="4" rx="2" fill="white" fillOpacity="0.85" />
        </motion.g>
      </g>

      {/* ── The merchant ────────────────────────────────────────────── */}
      <g className="text-fd-foreground">
        <rect x="430" y="96" width="96" height="108" rx="10" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="444" y={112 + i * 28} width="68" height="16" rx="4" fill="currentColor" fillOpacity="0.04" />
            <circle cx="454" cy={120 + i * 28} r="3" className="fill-fd-primary" fillOpacity={0.35 + i * 0.25} />
            <rect x="464" y={118 + i * 28} width={40 - i * 10} height="4" rx="2" fill="currentColor" fillOpacity="0.14" />
          </g>
        ))}
      </g>

      {/* ── The rail itself ─────────────────────────────────────────── */}
      <g className="text-fd-foreground">
        <line x1="130" y1="150" x2="430" y2="150" stroke="url(#rail-fade)" strokeWidth="1.5" />
        {[190, 250, 310, 370].map((x) => (
          <circle key={x} cx={x} cy="150" r="1.5" fill="currentColor" fillOpacity="0.2" />
        ))}
      </g>

      {/* Collect — value travelling from the phone to the merchant. */}
      <motion.circle
        r="5"
        cy="150"
        fill="#FFCC00"
        initial={{ cx: 140, opacity: 0 }}
        animate={still ? { cx: 285, opacity: 1 } : { cx: [140, 420], opacity: [0, 1, 1, 0] }}
        transition={still ? { duration: 0 } : { duration: 2.6, times: [0, 0.12, 0.88, 1], repeat: Infinity, repeatDelay: 1.6, ease: 'linear' }}
      />

      {/* Disburse — value travelling back out. */}
      <motion.circle
        r="5"
        cy="150"
        fill="#FF7900"
        initial={{ cx: 420, opacity: 0 }}
        animate={still ? { cx: 285, opacity: 0 } : { cx: [420, 140], opacity: [0, 1, 1, 0] }}
        transition={still ? { duration: 0 } : { duration: 2.6, times: [0, 0.12, 0.88, 1], repeat: Infinity, repeatDelay: 1.6, delay: 2.1, ease: 'linear' }}
      />

      {/* ── The two verbs, named on the rail ────────────────────────── */}
      <g className="fill-fd-muted-foreground font-mono" fontSize="11" letterSpacing="0.08em">
        <text x="280" y="132" textAnchor="middle">collect</text>
        <text x="280" y="180" textAnchor="middle">disburse</text>
      </g>
      <g className="text-fd-muted-foreground" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round">
        <path d="M246 128 h-14 m0 0 l4 -3 m-4 3 l4 3" transform="rotate(180 239 128)" />
        <path d="M328 176 h-14 m0 0 l4 -3 m-4 3 l4 3" />
      </g>
    </svg>
  );
}

/**
 * The two ways to collect, drawn rather than described.
 *
 * `charge` keeps the customer where they are and pushes a prompt at them;
 * `checkout` hands them to a page and takes them back. The difference is a
 * detour, so the figures differ by exactly that.
 */
export function CollectionShape({ variant }: { variant: 'charge' | 'checkout' }) {
  const direct = variant === 'charge';
  return (
    <svg viewBox="0 0 220 84" fill="none" className="w-full text-fd-foreground" aria-hidden>
      <rect x="4" y="30" width="46" height="24" rx="5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />
      <text x="27" y="46" textAnchor="middle" className="fill-fd-muted-foreground font-mono" fontSize="9">your app</text>

      <rect x="170" y="30" width="46" height="24" rx="5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />
      <text x="193" y="46" textAnchor="middle" className="fill-fd-muted-foreground font-mono" fontSize="9">paid</text>

      {direct ? (
        <>
          <line x1="52" y1="42" x2="168" y2="42" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.2" strokeDasharray="3 4" />
          <circle cx="110" cy="42" r="13" className="fill-fd-primary" fillOpacity="0.1" />
          <circle cx="110" cy="42" r="13" className="stroke-fd-primary" strokeOpacity="0.5" strokeWidth="1.2" />
          <path d="M105 42 l3.5 3.5 L116 38" className="stroke-fd-primary" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <path d="M52 42 C 78 42, 82 10, 110 10 C 138 10, 142 42, 168 42" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.2" strokeDasharray="3 4" fill="none" />
          <rect x="88" y="0" width="44" height="20" rx="5" className="fill-fd-primary" fillOpacity="0.1" />
          <rect x="88" y="0" width="44" height="20" rx="5" className="stroke-fd-primary" strokeOpacity="0.5" strokeWidth="1.2" />
          <text x="110" y="14" textAnchor="middle" className="fill-fd-primary font-mono" fontSize="9">tchokopay</text>
        </>
      )}
    </svg>
  );
}
