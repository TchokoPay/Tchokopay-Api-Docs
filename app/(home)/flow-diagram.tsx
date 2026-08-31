'use client';

import { Terminal } from 'lucide-react';
import { useRef } from 'react';
import { AnimatedBeam } from './animated-beam';

/**
 * How money moves, wired rather than described.
 *
 * One component draws both directions, because there is only one topology: the
 * networks on one side, the merchant on the other, and us in the middle. Money
 * in runs left to right; money out is the same picture with the ends swapped
 * and the pulses reversed. That the two figures are mirror images is the point
 * — it is the same rail either way.
 *
 * The networks named here are real ones we hold integrations to in live
 * countries. MTN and Orange carry their own colours because those are the two
 * open to the API today; the rest are drawn neutral, which is the same
 * distinction the providers tile makes with its unfilled row.
 */

type Network = { label: string; bg?: string; fg?: string };

const NETWORKS: Network[] = [
  { label: 'MTN', bg: '#FFCC00', fg: '#141414' },
  { label: 'Orange', bg: '#FF7900', fg: '#ffffff' },
  { label: 'Wave' },
  { label: 'Moov' },
  { label: 'Free' },
];

function Node({
  innerRef,
  children,
  className = '',
  style,
}: {
  innerRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      ref={innerRef}
      style={style}
      className={`border-fd-border relative z-10 flex items-center justify-center rounded-full border bg-white/[0.06] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function FlowDiagram({ direction }: { direction: 'collect' | 'disburse' }) {
  const container = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const merchant = useRef<HTMLDivElement>(null);
  // Five refs, declared flat because hooks cannot be called in a loop.
  const n0 = useRef<HTMLDivElement>(null);
  const n1 = useRef<HTMLDivElement>(null);
  const n2 = useRef<HTMLDivElement>(null);
  const n3 = useRef<HTMLDivElement>(null);
  const n4 = useRef<HTMLDivElement>(null);
  const networks = [n0, n1, n2, n3, n4];

  const collecting = direction === 'collect';

  const networkColumn = (
    <div className="flex flex-col justify-center gap-3">
      {NETWORKS.map((net, i) => (
        <Node
          key={net.label}
          innerRef={networks[i]}
          className="size-12 shrink-0"
          style={net.bg ? { backgroundColor: net.bg, borderColor: 'transparent' } : undefined}
        >
          <span
            className="font-mono text-[0.5rem] tracking-tight"
            style={{ color: net.fg ?? 'var(--color-fd-muted-foreground)' }}
          >
            {net.label}
          </span>
        </Node>
      ))}
    </div>
  );

  const merchantColumn = (
    <div className="flex flex-col justify-center">
      <Node innerRef={merchant} className="size-12 shrink-0">
        <Terminal className="text-fd-muted-foreground h-5 w-5" />
      </Node>
    </div>
  );

  return (
    <div
      ref={container}
      role="img"
      aria-label={
        collecting
          ? 'Payments from MTN, Orange, Wave, Moov and Free arriving through TchokoPay into your application.'
          : 'Payments leaving your application through TchokoPay out to MTN, Orange, Wave, Moov and Free.'
      }
      className="relative mx-auto flex h-[340px] w-full max-w-lg items-center justify-center"
    >
      <div className="flex size-full flex-row items-stretch justify-between">
        {collecting ? networkColumn : merchantColumn}

        <div className="flex flex-col justify-center">
          <Node innerRef={hub} className="size-16 shrink-0 bg-white/[0.08]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/favicon.png" alt="TchokoPay" className="size-9 rounded-full" />
          </Node>
        </div>

        {collecting ? merchantColumn : networkColumn}
      </div>

      {/* The fan: every network to the hub. Staggered so the pulses read as
          separate payments rather than one wave. */}
      <div className="text-fd-foreground">
        {networks.map((ref, i) => (
          <AnimatedBeam
            key={NETWORKS[i].label}
            containerRef={container}
            fromRef={collecting ? ref : hub}
            toRef={collecting ? hub : ref}
            curvature={0}
            reverse={!collecting}
            duration={4.2}
            delay={i * 0.55}
          />
        ))}
        {/* And the single line to the other side. */}
        <AnimatedBeam
          containerRef={container}
          fromRef={collecting ? hub : merchant}
          toRef={collecting ? merchant : hub}
          reverse={!collecting}
          duration={4.2}
          delay={collecting ? 1.2 : 0}
        />
      </div>
    </div>
  );
}
