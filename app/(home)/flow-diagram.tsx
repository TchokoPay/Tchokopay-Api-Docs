"use client";

import { User } from "lucide-react";
import { useRef } from "react";
import { AnimatedBeam } from "./animated-beam";

/**
 * How money moves, wired rather than described.
 *
 * One component draws both directions, because there is only one topology: the
 * networks on one side, the merchant on the other, and us in the middle. Money
 * in runs left to right; money out is the same picture with the ends swapped.
 * Nothing about the beams changes — the gradient sweeps left to right in screen
 * space regardless of which end a path was declared from, so mirroring the
 * columns is the whole flip. That the two figures are mirror images is the
 * point: it is the same rail either way.
 *
 * The networks named here are real ones we hold integrations to in live
 * countries. MTN and Orange carry their own colours because those are the two
 * open to the API today; the rest are drawn neutral, which is the same
 * distinction the providers tile makes with its unfilled row.
 */

type Network = { label: string; bg?: string; fg?: string };

const NETWORKS: Network[] = [
  { label: "MTN", bg: "#FFCC00", fg: "#141414" },
  { label: "Orange", bg: "#FF7900", fg: "#ffffff" },
  { label: "Wave" },
  { label: "Moov" },
  { label: "Free" },
];

function Node({
  innerRef,
  children,
  className = "",
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

export function FlowDiagram({
  direction,
  compact = false,
}: {
  direction: "collect" | "disburse";
  /** Sized to sit inside a card rather than stand on its own. */
  compact?: boolean;
}) {
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

  const collecting = direction === "collect";

  const networkColumn = (
    <div
      className={`flex flex-col justify-center ${compact ? "gap-2" : "gap-3"}`}
    >
      {NETWORKS.map((net, i) => (
        <Node
          key={net.label}
          innerRef={networks[i]}
          className={`shrink-0 ${compact ? "size-10" : "size-12"}`}
          style={
            net.bg
              ? { backgroundColor: net.bg, borderColor: "transparent" }
              : undefined
          }
        >
          <span
            className={`font-mono tracking-tight ${compact ? "text-[0.45rem]" : "text-[0.5rem]"}`}
            style={{ color: net.fg ?? "var(--color-fd-muted-foreground)" }}
          >
            {net.label}
          </span>
        </Node>
      ))}
    </div>
  );

  const merchantColumn = (
    <div className="flex flex-col justify-center">
      <Node
        innerRef={merchant}
        className={`shrink-0 ${compact ? "size-10" : "size-12"}`}
      >
        <User
          className={`text-fd-muted-foreground ${compact ? "h-4 w-4" : "h-5 w-5"}`}
        />
      </Node>
    </div>
  );

  return (
    <div
      ref={container}
      role="img"
      aria-label={
        collecting
          ? "Payments from MTN, Orange, Wave, Moov and Free arriving through TchokoPay to you."
          : "Payments leaving you through TchokoPay out to MTN, Orange, Wave, Moov and Free."
      }
      className={`relative mx-auto flex w-full max-w-lg items-center justify-center ${compact ? "h-[264px]" : "h-[340px]"}`}
    >
      <div className="flex size-full flex-row items-stretch justify-between">
        {collecting ? networkColumn : merchantColumn}

        <div className="flex flex-col justify-center">
          <Node
            innerRef={hub}
            className={`shrink-0 bg-white/[0.08] ${compact ? "size-13" : "size-16"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.png"
              alt="TchokoPay"
              className={`rounded-full ${compact ? "size-7" : "size-9"}`}
            />
          </Node>
        </div>

        {collecting ? merchantColumn : networkColumn}
      </div>

      {/* Every beam is declared the same way in both directions, and none of
          them is reversed: the mirrored columns above are what turns money in
          into money out. Every beam also runs on the same clock, so the charge
          leaves all five nodes at once rather than trickling round the fan. */}
      <div className="text-fd-foreground">
        {networks.map((ref, i) => (
          <AnimatedBeam
            key={NETWORKS[i].label}
            containerRef={container}
            fromRef={ref}
            toRef={hub}
            duration={3}
          />
        ))}
        <AnimatedBeam containerRef={container} fromRef={hub} toRef={merchant} duration={3} />
      </div>
    </div>
  );
}
