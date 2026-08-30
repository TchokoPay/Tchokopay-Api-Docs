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
