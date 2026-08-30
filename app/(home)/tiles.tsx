/**
 * The shelf at the foot of the hero.
 *
 * Five tiles, one per thing the API actually does, drawn rather than
 * photographed — a payments API has no faces to show, and the endpoints are
 * the concrete objects here. Each figure is built from the same parts as the
 * rest of the page: hairline strokes in `currentColor`, one blue accent for
 * the thing that acts, and the operator colours only on the tile that is
 * literally about which networks are live.
 *
 * They are static SVG, so this file is a server component and the shelf costs
 * the page no JavaScript.
 */

const STROKE = { stroke: 'currentColor', strokeOpacity: 0.35, strokeWidth: 1.2 } as const;

/** A prompt landing on a handset, with the approve button lit. */
function ChargeFigure() {
  return (
    <svg viewBox="0 0 112 92" fill="none" className="w-full" aria-hidden>
      <rect x="34" y="6" width="44" height="80" rx="7" {...STROKE} />
      <line x1="48" y1="13" x2="64" y2="13" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
      <rect x="41" y="26" width="30" height="5" rx="2.5" fill="currentColor" fillOpacity="0.16" />
      <rect x="41" y="36" width="19" height="5" rx="2.5" fill="currentColor" fillOpacity="0.1" />
      <rect x="41" y="54" width="30" height="13" rx="4.5" className="fill-fd-primary" fillOpacity="0.9" />
      <rect x="48" y="59.5" width="16" height="2.5" rx="1.25" fill="white" fillOpacity="0.85" />
    </svg>
  );
}

/** A page of ours, with the pay button on it. */
function CheckoutFigure() {
  return (
    <svg viewBox="0 0 112 92" fill="none" className="w-full" aria-hidden>
      <rect x="10" y="14" width="92" height="64" rx="7" {...STROKE} />
      <line x1="10" y1="30" x2="102" y2="30" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
      {[20, 28, 36].map((cx) => (
        <circle key={cx} cx={cx} cy="22" r="2" fill="currentColor" fillOpacity="0.22" />
      ))}
      <rect x="22" y="40" width="42" height="5" rx="2.5" fill="currentColor" fillOpacity="0.14" />
      <rect x="22" y="50" width="28" height="5" rx="2.5" fill="currentColor" fillOpacity="0.09" />
      <rect x="22" y="62" width="34" height="11" rx="4" className="fill-fd-primary" fillOpacity="0.85" />
      <rect x="76" y="40" width="14" height="14" rx="4" className="stroke-fd-primary" strokeOpacity="0.5" strokeWidth="1.2" />
    </svg>
  );
}

/** Value leaving a balance for someone else's number. */
function DisburseFigure() {
  return (
    <svg viewBox="0 0 112 92" fill="none" className="w-full" aria-hidden>
      <rect x="6" y="26" width="40" height="36" rx="6" {...STROKE} />
      <rect x="14" y="35" width="24" height="4" rx="2" fill="currentColor" fillOpacity="0.16" />
      <rect x="14" y="44" width="16" height="4" rx="2" fill="currentColor" fillOpacity="0.1" />
      <path d="M52 44 h20" className="stroke-fd-primary" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M68 39.5 l5 4.5 l-5 4.5" className="stroke-fd-primary" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="80" y="18" width="26" height="52" rx="6" {...STROKE} />
      <circle cx="93" cy="44" r="5" className="fill-fd-primary" fillOpacity="0.9" />
    </svg>
  );
}

/** A signed delivery arriving at the merchant's own endpoint. */
function WebhookFigure() {
  return (
    <svg viewBox="0 0 112 92" fill="none" className="w-full" aria-hidden>
      <rect x="4" y="28" width="34" height="32" rx="6" {...STROKE} />
      {[36, 44, 52].map((y, i) => (
        <rect key={y} x="11" y={y - 2} width={20 - i * 5} height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.14" />
      ))}
      <path d="M42 44 h28" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="3 4" />
      <circle cx="56" cy="44" r="4.5" className="fill-fd-primary" fillOpacity="0.9" />
      <rect x="74" y="28" width="34" height="32" rx="6" {...STROKE} />
      <path d="M83 44 l4.5 4.5 l9 -10" className="stroke-fd-primary" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** Which networks are live — the one place the operator colours belong. */
function ProvidersFigure() {
  return (
    <svg viewBox="0 0 112 92" fill="none" className="w-full" aria-hidden>
      <rect x="10" y="12" width="92" height="68" rx="7" {...STROKE} />
      {[
        { cy: 30, fill: '#FFCC00', w: 44, o: 0.16 },
        { cy: 46, fill: '#FF7900', w: 36, o: 0.16 },
      ].map((r) => (
        <g key={r.cy}>
          <circle cx="26" cy={r.cy} r="4.5" fill={r.fill} />
          <rect x="38" y={r.cy - 2} width={r.w} height="4" rx="2" fill="currentColor" fillOpacity={r.o} />
        </g>
      ))}
      <circle cx="26" cy="62" r="4.5" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.2" />
      <rect x="38" y="60" width="28" height="4" rx="2" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}

/**
 * Captions are the endpoint, not a description: on a shelf this small the path
 * is the shortest true label, and it is what a developer scans for.
 */
const tiles = [
  { path: 'collect/charge', label: 'Push a prompt to a number', Figure: ChargeFigure },
  { path: 'collect/checkout', label: 'Hand the payer a page', Figure: CheckoutFigure },
  { path: 'disburse', label: 'Send money out', Figure: DisburseFigure },
  { path: 'webhooks', label: 'Signed delivery of every result', Figure: WebhookFigure },
  { path: 'providers', label: 'Which networks are live', Figure: ProvidersFigure },
];

export function CapabilityShelf() {
  return (
    <ul className="mx-auto flex w-full max-w-4xl list-none gap-5 sm:justify-center sm:gap-6">
      {tiles.map(({ path, label, Figure }) => (
        <li
          key={path}
          title={label}
          className="border-fd-border hover:border-fd-primary/40 flex h-44 w-36 shrink-0 flex-col justify-between rounded-xl border bg-white/[0.03] px-4 pt-5 pb-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
        >
          <Figure />
          <span className="text-fd-muted-foreground text-center font-mono text-[0.65rem] tracking-tight">
            {path}
          </span>
        </li>
      ))}
    </ul>
  );
}
