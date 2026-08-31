import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HighlightedCode } from "./hero-code";
import { FadeUp, FadeInView } from "./animated";
import { CapabilityShelf } from "./tiles";
import { FlowDiagram } from "./flow-diagram";
import { DotCylinder } from "./dot-cylinder";
import { Wordmark } from "./wordmark";

/**
 * One typographic rule runs through this page: monospace is machine
 * vocabulary — endpoints, statuses, references, scopes — and the sans is
 * everything a person says. The hero is a sentence a merchant would say about
 * their own business, so it is sans throughout; `collect` and `disburse` only
 * take mono further down, where they stop being verbs and start being the
 * names of two calls.
 */

const chargeSample = `curl -X POST https://connect.tchokopay.com/v1/collect/charge \\
  -H "Authorization: Bearer tchoko_live_..." \\
  -H "Idempotency-Key: order-4821" \\
  -d '{
    "amount": 5000,
    "currency": "XAF",
    "country": "CM",
    "provider": "mtn_cm",
    "phone": "670000000"
  }'`;

const disburseSample = `curl -X POST https://connect.tchokopay.com/v1/disburse \\
  -H "Authorization: Bearer tchoko_live_..." \\
  -H "Idempotency-Key: payout-4417" \\
  -d '{
    "amount": 25000,
    "currency": "XAF",
    "country": "CM",
    "provider": "mtn_cm",
    "phone": "670000000"
  }'`;

const capabilities = [
  {
    term: "Idempotency-Key",
    title: "A retry is never a second payment",
    body: "Send the same key again and you get the original back — not a second prompt on your customer’s phone, and never a second disbursement.",
  },
  {
    term: "X-TchokoPay-Signature",
    title: "Webhooks you can trust",
    body: "Every delivery is HMAC-signed with the timestamp bound in, so a captured payload cannot be replayed at you later.",
  },
  {
    term: "GET /v1/providers",
    title: "Nothing to hardcode",
    body: "Ask which countries, networks and amounts are live. Your integration keeps working as we open new markets.",
  },
  {
    term: "scopes",
    title: "A key that cannot spend",
    body: "Keys carry fixed permissions. The one in your checkout collects and nothing else — it can never move money out.",
  },
];

export default function HomePage() {
  // The nav floats over the hero, so the page starts behind it. The pull sits
  // on this element rather than on the hero section: `overflow-x-hidden`
  // computes overflow-y to `auto`, making this a clip box that ate the
  // section’s negative margin and left a pale strip above the band.
  return (
    <main className="-mt-14 flex flex-1 flex-col overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────
          One centred axis: notice, name, sentence, two ways in, and the rail
          holding the width at the bottom. It is the only committed-dark band
          on the site — see `.hero-dark` in global.css, which redefines the
          theme tokens rather than restyling what sits inside it. */}
      <section className="border-fd-border relative overflow-hidden border-b">
        {/* Three layers, back to front: the cylinder, the glow sitting down in
            its hollow, then the content. The glow lives on its own element
            rather than on the section — a background-image on the section
            paints under every child, so the dots could never get behind it. */}
        <DotCylinder className="hero-dots" />
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        {/* The nav floats inside the band, so the band has to start behind it:
            the section is pulled up by the nav’s height and the top padding
            gives it back, which keeps the pill sitting on the hero rather than
            on the page’s own ground. */}
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-[8.5rem] pb-20 text-center sm:px-6 sm:pt-[10.5rem] sm:pb-28 lg:pt-[11.5rem] lg:pb-32">
          <FadeUp>
            <div className="border-fd-border flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border bg-white/5 px-4 py-2 text-sm">
              <span className="text-fd-muted-foreground">
                Live in 6+ countries across Africa
              </span>
              <Link
                href="/docs/api-reference/providers"
                className="focus-visible:ring-fd-primary inline-flex items-center gap-1 font-medium transition-opacity hover:opacity-75 focus-visible:rounded-full focus-visible:ring-2 focus-visible:outline-none"
              >
                See coverage
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            {/* The gradient runs down the block so the second line settles. The
                break is held only where there is room for it; on a phone the
                sentence wraps on its own rather than breaking in a fixed
                place that no longer suits the measure. */}
            <h1 className="mt-7 max-w-5xl bg-gradient-to-b from-white to-[#8ea0c6] bg-clip-text text-[2rem] leading-[1.08] font-semibold tracking-tight text-transparent text-balance sm:text-5xl lg:text-[3.75rem]">
              Start collecting and disbursing
              <br className="hidden sm:inline" /> payments in 5 minutes.
            </h1>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-fd-muted-foreground mx-auto mt-5 max-w-3xl text-base leading-relaxed sm:text-lg">
              Plug us into your app or website. Collect from across Africa and
              the world, and pay anyone out across the continent.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="xs:w-auto xs:flex-row xs:items-center mt-9 flex w-full flex-col items-stretch justify-center gap-3">
              <Link
                href="/docs/quickstart"
                className="focus-visible:ring-fd-primary inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-solid)] px-7 py-3 text-sm font-medium text-white shadow-[0_0_44px_-10px_var(--accent-solid)] transition duration-200 hover:bg-[var(--accent-solid-hover)] hover:shadow-[0_0_56px_-6px_var(--accent-solid)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background focus-visible:outline-none active:scale-[0.98]"
              >
                Start building
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs/api-reference/charge"
                className="border-fd-border focus-visible:ring-fd-primary inline-flex items-center justify-center gap-2 rounded-full border bg-white/5 px-7 py-3 font-mono text-sm transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background focus-visible:outline-none"
              >
                API reference
              </Link>
            </div>
          </FadeUp>

          {/* Five tiles do not fit a phone, and shrinking them to fit would
              cost the figures their detail. Below the breakpoint the shelf
              scrolls at full size instead, bleeding to both edges so it reads
              as more than the screen holds. */}
          <FadeUp
            delay={0.2}
            className="-mx-4 w-[calc(100%+2rem)] sm:mx-0 sm:w-full"
          >
            <div className="mt-16 overflow-x-auto px-4 pb-4 sm:mt-20 sm:overflow-visible sm:px-0">
              <CapabilityShelf />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Both directions ──────────────────────────────────────────
          The two cards carry the rail itself, mirrored, because the pair of
          figures is the argument: one topology, read either way. */}
      <section className="border-fd-border border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          {/* Centred, unlike the sections below it: what follows is a
              symmetrical pair, and a heading hard against the left edge fights
              that. */}
          <FadeInView className="text-center">
            <span className="text-fd-muted-foreground font-mono text-[0.7rem] tracking-[0.18em] uppercase">
              Both directions
            </span>
            <h2 className="mx-auto mt-4 max-w-xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Money in, and money back out.
            </h2>
            <p className="text-fd-muted-foreground mx-auto mt-4 max-w-lg text-balance">
              The same rail, the same settlement, the same webhook. What changes
              is which way it runs.
            </p>
          </FadeInView>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                key: "collect",
                direction: "collect" as const,
                paths: ["POST /v1/collect/charge", "POST /v1/collect/checkout"],
                title: "Collect",
                body: "Push a prompt straight to a number you already have, or hand the payer a hosted page and let them choose. The money settles the same way either way.",
                needs: "You collect the number, or nothing at all.",
              },
              {
                key: "disburse",
                direction: "disburse" as const,
                paths: ["POST /v1/disburse"],
                title: "Disburse",
                body: "Settle a seller, pay a supplier, send a refund. You name the network and the number exactly as you do for a charge — the endpoint is what changes.",
                needs: "Needs a key carrying the Disburse permission.",
              },
            ].map((c, i) => (
              <FadeInView key={c.key} delay={i * 0.08}>
                <div className="border-fd-border bg-fd-card hover:border-fd-primary/40 flex h-full flex-col rounded-xl border p-6 transition-colors sm:p-7">
                  <FlowDiagram direction={c.direction} compact />
                  <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
                    {c.paths.map((path) => (
                      <code
                        key={path}
                        className="text-fd-muted-foreground text-xs break-all"
                      >
                        {path}
                      </code>
                    ))}
                  </div>
                  <h3 className="mt-3 text-lg font-medium">{c.title}</h3>
                  <p className="text-fd-muted-foreground mt-2 text-sm leading-relaxed text-balance">
                    {c.body}
                  </p>
                  <p className="border-fd-border text-fd-muted-foreground mt-5 border-t pt-4 text-xs">
                    {c.needs}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <section className="border-fd-border border-b">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <FadeInView>
            <span className="text-fd-muted-foreground font-mono text-[0.7rem] tracking-[0.18em] uppercase">
              The request
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              A payment is one request.
            </h2>
            <p className="text-fd-muted-foreground mt-4 max-w-md text-balance">
              Flat body, no nesting, nothing inferred. You name the country, the
              network and the number — we never guess which, because a guessed
              network sends a prompt nobody can answer.
            </p>
            <dl className="mt-8 space-y-3 text-sm">
              {[
                ["202", "Returns immediately. The prompt is on its way."],
                [
                  "collect.succeeded",
                  "Arrives at your webhook the moment it clears.",
                ],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex flex-col gap-1 sm:flex-row sm:gap-4"
                >
                  <dt className="text-fd-primary shrink-0 font-mono text-xs sm:w-40 sm:pt-0.5">
                    {k}
                  </dt>
                  <dd className="text-fd-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </FadeInView>

          <FadeInView delay={0.1}>
            <HighlightedCode
              code={chargeSample}
              lang="bash"
              title="charge.sh"
              terminal
              className="shadow-xl shadow-black/[0.03] dark:shadow-black/20"
            />
          </FadeInView>
        </div>
      </section>

      {/* ── Disbursing ───────────────────────────────────────────────── */}
      <section className="border-fd-border border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <FadeInView>
            <span className="text-fd-muted-foreground font-mono text-[0.7rem] tracking-[0.18em] uppercase">
              Disbursing
            </span>
            <h2 className="mt-4 max-w-xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              The same body, the other direction.
            </h2>
            <p className="text-fd-muted-foreground mt-4 max-w-md text-balance">
              Settle a seller, pay a supplier, send a refund. You name the
              network and the number exactly as you do for a charge — the
              endpoint is what changes.
            </p>
          </FadeInView>

          <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <FadeInView className="lg:order-2">
              <dl className="space-y-3 text-sm">
                {[
                  [
                    "POST /v1/disburse",
                    "Money leaves your balance for any number on a supported network.",
                  ],
                  [
                    "disburse.succeeded",
                    "Fires when the recipient is credited, not when we accept the request.",
                  ],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex flex-col gap-1 sm:flex-row sm:gap-4"
                  >
                    <dt className="text-fd-primary shrink-0 font-mono text-xs sm:w-40 sm:pt-0.5">
                      {k}
                    </dt>
                    <dd className="text-fd-muted-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </FadeInView>

            <FadeInView delay={0.1} className="lg:order-1">
              <HighlightedCode
                code={disburseSample}
                lang="bash"
                title="disburse.sh"
                terminal
                className="shadow-xl shadow-black/[0.03] dark:shadow-black/20"
              />
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ── Capabilities ─────────────────────────────────────────────── */}
      <section className="border-fd-border border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <FadeInView>
            <span className="text-fd-muted-foreground font-mono text-[0.7rem] tracking-[0.18em] uppercase">
              What you get
            </span>
          </FadeInView>

          <dl className="mt-10 grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {capabilities.map((f, i) => (
              <FadeInView key={f.term} delay={(i % 2) * 0.06}>
                <div className="border-fd-border flex flex-col gap-2 border-t py-7">
                  <dt className="text-fd-primary font-mono text-xs break-all">
                    {f.term}
                  </dt>
                  <dd>
                    <p className="font-medium">{f.title}</p>
                    <p className="text-fd-muted-foreground mt-1.5 text-sm leading-relaxed text-balance">
                      {f.body}
                    </p>
                  </dd>
                </div>
              </FadeInView>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Close ────────────────────────────────────────────────────── */}
      <section className="border-fd-border border-b">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-16 text-center sm:px-6 sm:py-24">
          <FadeInView>
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Your first payment is about five minutes away.
            </h2>
            <p className="text-fd-muted-foreground mx-auto mt-4 max-w-sm text-sm text-balance">
              Generate a key from your dashboard, then follow the quickstart.
            </p>
            <div className="sm:w-auto sm:flex-row sm:items-center mt-8 flex w-full flex-col items-stretch justify-center gap-3">
              <Link
                href="/docs/quickstart"
                className="focus-visible:ring-fd-primary focus-visible:ring-offset-fd-background inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-solid)] px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-[var(--accent-solid-hover)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]"
              >
                Read the quickstart
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://tchokopay.com/merchant/developers"
                className="border-fd-border focus-visible:ring-fd-primary focus-visible:ring-offset-fd-background inline-flex items-center justify-center gap-2 rounded-full border bg-white/5 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Get an API key
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ── The name ─────────────────────────────────────────────────── */}
      <footer>
        <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
          <div className="text-fd-muted-foreground flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
            <span>© {new Date().getFullYear()} TchokoPay</span>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link
                href="/docs"
                className="hover:text-fd-foreground transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/docs/api-reference/charge"
                className="hover:text-fd-foreground transition-colors"
              >
                API reference
              </Link>
              <Link
                href="https://tchokopay.com/merchant/developers"
                className="hover:text-fd-foreground transition-colors"
              >
                Dashboard
              </Link>
              <a
                href="mailto:tech@tchokopay.com"
                className="hover:text-fd-foreground transition-colors"
              >
                tech@tchokopay.com
              </a>
            </nav>
          </div>
        </div>
        <Wordmark />
      </footer>
    </main>
  );
}
