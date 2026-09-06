/**
 * The shelf at the foot of the hero.
 *
 * Five tiles, one per thing the API actually does, drawn rather than
 * photographed — a payments API has no faces to show, and the endpoints are
 * the concrete objects here.
 *
 * Each figure shows the moment the endpoint exists for, not an icon standing
 * in for it: the prompt on the payer's handset with a real amount on it, the
 * hosted page with the two networks to choose between, money leaving a balance
 * for someone's number, a signed delivery arriving at a server, the coverage
 * list with the live rows filled and the rest waiting. The operator colours
 * appear only where those networks are literally named.
 *
 * Static SVG throughout, so the shelf costs the page no JavaScript.
 */

/** One hairline weight across every figure, so the five read as a set. */
const LINE = { stroke: 'currentColor', strokeOpacity: 0.32, strokeWidth: 1.2 } as const;
const FAINT = { stroke: 'currentColor', strokeOpacity: 0.18, strokeWidth: 1.1 } as const;

const MTN = '#FFCC00';
const ORANGE = '#FF7900';

/**
 * A charge: the prompt has arrived on the payer's handset and is waiting on
 * them. The amount is the point of the figure — it is what makes it a payment
 * rather than a notification.
 */
function ChargeFigure() {
  return (
    <svg viewBox="0 0 132 116" fill="none" className="w-full" aria-hidden>
      {/* the push, arriving */}
      <g className="text-fd-primary">
        <path d="M6 52 h14" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M17 48.5 l4 3.5 l-4 3.5" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <rect x="34" y="2" width="62" height="112" rx="11" {...LINE} />
      <line x1="55" y1="10" x2="75" y2="10" stroke="currentColor" strokeOpacity="0.26" strokeWidth="2.2" strokeLinecap="round" />

      {/* the app behind, dimmed while the sheet is up */}
      <rect x="42" y="20" width="34" height="4" rx="2" fill="currentColor" fillOpacity="0.09" />
      <rect x="42" y="29" width="22" height="4" rx="2" fill="currentColor" fillOpacity="0.06" />

      {/* the prompt sheet */}
      <rect x="38" y="42" width="54" height="70" rx="9" fill="currentColor" fillOpacity="0.05" {...FAINT} />
      <rect x="46" y="51" width="22" height="3" rx="1.5" fill="currentColor" fillOpacity="0.18" />

      <text x="65" y="71" textAnchor="middle" fill="currentColor" fillOpacity="0.92" className="font-mono" fontSize="12.5" fontWeight="600" letterSpacing="-0.4">
        5 000
        <tspan fontSize="6.5" fillOpacity="0.5" dx="2">
          XAF
        </tspan>
      </text>

      <rect x="46" y="82" width="38" height="13" rx="6.5" className="fill-fd-primary" fillOpacity="0.92" />
      <path d="M59 88.5 l3 3 l6 -6.5" stroke="white" strokeOpacity="0.95" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="55" y="102" width="20" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

/**
 * A hosted checkout: our page, with the networks laid out for the payer to
 * pick from. The two rows are why this endpoint exists — the merchant collects
 * nothing, because the choice happens here.
 */
function CheckoutFigure() {
  return (
    <svg viewBox="0 0 132 116" fill="none" className="w-full" aria-hidden>
      <rect x="2" y="8" width="128" height="100" rx="10" {...LINE} />
      <line x1="2" y1="26" x2="130" y2="26" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.1" />
      {[11, 18, 25].map((cx) => (
        <circle key={cx} cx={cx} cy="17" r="2" fill="currentColor" fillOpacity="0.22" />
      ))}
      <rect x="36" y="13" width="60" height="8" rx="4" fill="currentColor" fillOpacity="0.06" />

      <text x="12" y="41" className="fill-fd-primary font-mono" fontSize="8.5" letterSpacing="-0.2">
        tchokopay
      </text>
      <text x="120" y="41" textAnchor="end" fill="currentColor" fillOpacity="0.55" className="font-mono" fontSize="8.5">
        5 000
      </text>

      {/* the choice: one network selected, one waiting */}
      <rect x="11" y="50" width="110" height="18" rx="6" className="stroke-fd-primary" strokeOpacity="0.55" strokeWidth="1.2" fill="currentColor" fillOpacity="0.04" />
      <circle cx="24" cy="59" r="5" fill={MTN} />
      <rect x="36" y="57" width="38" height="4" rx="2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="110" cy="59" r="3.5" className="fill-fd-primary" />

      <rect x="11" y="72" width="110" height="18" rx="6" {...FAINT} />
      <circle cx="24" cy="81" r="5" fill={ORANGE} />
      <rect x="36" y="79" width="30" height="4" rx="2" fill="currentColor" fillOpacity="0.14" />

      <rect x="11" y="95" width="110" height="8" rx="4" className="fill-fd-primary" fillOpacity="0.85" />
    </svg>
  );
}

/**
 * A disbursement: an amount leaves the merchant's balance and lands on
 * somebody's number. The arrow points away from the money, which is the whole
 * difference between this endpoint and the two above it.
 */
function DisburseFigure() {
  return (
    <svg viewBox="0 0 132 116" fill="none" className="w-full" aria-hidden>
      {/* the balance it leaves */}
      <rect x="1" y="30" width="56" height="56" rx="10" {...LINE} />
      <rect x="11" y="41" width="20" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.16" />
      <text x="11" y="63" fill="currentColor" fillOpacity="0.85" className="font-mono" fontSize="11.5" fontWeight="600" letterSpacing="-0.5">
        25 000
      </text>
      <rect x="11" y="71" width="30" height="3" rx="1.5" fill="currentColor" fillOpacity="0.09" />

      {/* leaving */}
      <g className="text-fd-primary">
        <path d="M62 58 h12" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="1 4" />
        <circle cx="68" cy="58" r="4.5" fill="currentColor" fillOpacity="0.95" />
        <path d="M76 58 h4 m-1.5 -3.5 l3.5 3.5 l-3.5 3.5" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* the number it lands on */}
      <rect x="88" y="14" width="43" height="88" rx="9" {...LINE} />
      <line x1="102" y1="22" x2="117" y2="22" stroke="currentColor" strokeOpacity="0.26" strokeWidth="2" strokeLinecap="round" />
      <circle cx="109.5" cy="50" r="10" fill="currentColor" fillOpacity="0.05" {...FAINT} />
      <path d="M104 50 a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="109.5" cy="44.5" r="3" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />
      <rect x="97" y="68" width="25" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.14" />
      <rect x="97" y="78" width="25" height="10" rx="5" className="fill-fd-primary" fillOpacity="0.9" />
    </svg>
  );
}

/**
 * A webhook: the result, signed, arriving at the merchant's own endpoint. The
 * signature line is the part worth drawing — it is what makes the delivery
 * trustworthy rather than merely prompt.
 */
function WebhookFigure() {
  return (
    <svg viewBox="0 0 132 116" fill="none" className="w-full" aria-hidden>
      {/* the delivery */}
      <rect x="2" y="26" width="82" height="64" rx="10" fill="currentColor" fillOpacity="0.04" {...LINE} />
      <rect x="13" y="38" width="44" height="4.5" rx="2.25" fill="currentColor" fillOpacity="0.2" />
      <rect x="13" y="49" width="28" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.11" />
      <line x1="13" y1="62" x2="73" y2="62" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.1" />

      {/* signed */}
      <g className="text-fd-primary">
        <rect x="13" y="71" width="9" height="7" rx="2" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.2" />
        <path d="M15.5 71 v-2 a2 2 0 0 1 4 0 v2" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="28" y="73" width="34" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.55" />
      </g>

      {/* into your endpoint */}
      <path d="M88 58 h12" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="3 3.5" />
      <rect x="102" y="42" width="29" height="32" rx="8" {...LINE} />
      <path d="M110 58 l4 4 l9 -9.5" className="stroke-fd-primary" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Coverage: which networks are live, asked rather than hardcoded. The filled
 * rows are running; the outlined one is the market that has not opened yet,
 * which is the reason to call the endpoint instead of shipping a list.
 */
function ProvidersFigure() {
  return (
    <svg viewBox="0 0 132 116" fill="none" className="w-full" aria-hidden>
      <rect x="2" y="6" width="128" height="104" rx="10" {...LINE} />

      <rect x="13" y="17" width="26" height="12" rx="6" {...FAINT} />
      <text x="26" y="25.5" textAnchor="middle" fill="currentColor" fillOpacity="0.55" className="font-mono" fontSize="7.5">
        CM
      </text>

      {[
        { y: 40, dot: MTN, w: 46, o: 0.2, live: true },
        { y: 63, dot: ORANGE, w: 38, o: 0.2, live: true },
      ].map((r) => (
        <g key={r.y}>
          <circle cx="24" cy={r.y + 8} r="5.5" fill={r.dot} />
          <rect x="37" y={r.y + 6} width={r.w} height="4" rx="2" fill="currentColor" fillOpacity={r.o} />
          <rect x="108" y={r.y + 5.5} width="10" height="5" rx="2.5" className="fill-fd-primary" fillOpacity="0.65" />
        </g>
      ))}

      {/* not open yet — the reason this endpoint exists */}
      <circle cx="24" cy="94" r="5.5" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1.2" />
      <rect x="37" y="92" width="30" height="4" rx="2" fill="currentColor" fillOpacity="0.08" />
      <rect x="108" y="91.5" width="10" height="5" rx="2.5" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.1" />
    </svg>
  );
}

/**
 * Captions are the endpoint, not a description: on a shelf this size the path
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
    <ul className="mx-auto flex w-full max-w-4xl list-none gap-5 sm:justify-center">
      {tiles.map(({ path, label, Figure }) => (
        <li
          key={path}
          title={label}
          className="border-fd-border hover:border-fd-primary/40 relative flex h-52 w-40 shrink-0 flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-b from-white/[0.055] to-white/[0.015] px-3.5 pt-4 pb-3.5 transition duration-300 before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent hover:-translate-y-1 hover:from-white/[0.08] hover:to-white/[0.03]"
        >
          <div className="flex flex-1 items-center">
            <Figure />
          </div>
          <span className="text-fd-muted-foreground text-center font-mono text-[0.65rem] tracking-tight">
            {path}
          </span>
        </li>
      ))}
    </ul>
  );
}
