import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HighlightedCode } from './hero-code';
import { Stagger, FadeUp, FadeInView } from './animated';
import { PaymentRail, CollectionShape } from './illustrations';
import { Wordmark } from './wordmark';

/**
 * One typographic rule runs through this page: monospace is machine
 * vocabulary — endpoints, statuses, references, and the two verbs the API is
 * built around — and the sans is everything a person says. It is why `collect`
 * and `disburse` are set in mono inside the headline: they are not English
 * words there, they are the names of two calls.
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
    term: 'Idempotency-Key',
    title: 'A retry is never a second payment',
    body: 'Send the same key again and you get the original back — not a second prompt on your customer’s phone, and never a second disbursement.',
  },
  {
    term: 'X-TchokoPay-Signature',
    title: 'Webhooks you can trust',
    body: 'Every delivery is HMAC-signed with the timestamp bound in, so a captured payload cannot be replayed at you later.',
  },
  {
    term: 'GET /v1/providers',
    title: 'Nothing to hardcode',
    body: 'Ask which countries, networks and amounts are live. Your integration keeps working as we open new markets.',
  },
  {
    term: 'scopes',
    title: 'A key that cannot spend',
    body: 'Keys carry fixed permissions. The one in your checkout collects and nothing else — it can never move money out.',
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-fd-border relative border-b">
        <div aria-hidden className="bg-grid-pattern pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <Stagger className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <FadeUp>
                <span className="text-fd-muted-foreground font-mono text-[0.7rem] tracking-[0.18em] uppercase">
                  Merchant API
                </span>
              </FadeUp>

              <FadeUp delay={0.05}>
                <h1 className="mt-5 text-4xl leading-[1.06] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
                  Two verbs.
                  <br />
                  <span className="text-fd-primary font-mono text-[0.82em] font-medium tracking-tight">
                    collect
                  </span>{' '}
                  and{' '}
                  <span className="text-fd-primary font-mono text-[0.82em] font-medium tracking-tight">
                    disburse
                  </span>
                  .
                </h1>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p className="text-fd-muted-foreground mt-6 max-w-md text-base leading-relaxed text-balance sm:text-lg">
                  Take mobile money payments and send them back out, from your own backend.
                  We hold the operator integrations so you don’t have to.
                </p>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="xs:w-auto xs:flex-row xs:items-center mt-9 flex w-full flex-col items-stretch gap-3">
                  <Link
                    href="/docs/quickstart"
                    className="bg-fd-primary text-fd-primary-foreground focus-visible:ring-fd-primary focus-visible:ring-offset-fd-background inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]"
                  >
                    Start building
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/docs/api-reference/charge"
                    className="border-fd-border hover:bg-fd-secondary focus-visible:ring-fd-primary focus-visible:ring-offset-fd-background inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 font-mono text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    API reference
                  </Link>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.2} className="w-full">
              <PaymentRail className="text-fd-foreground mx-auto w-full max-w-xl" />
            </FadeUp>
          </Stagger>
        </div>
      </section>

      {/* ── Two ways to collect ──────────────────────────────────────── */}
      <section className="border-fd-border border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <FadeInView>
            <span className="text-fd-muted-foreground font-mono text-[0.7rem] tracking-[0.18em] uppercase">
              Collecting
            </span>
            <h2 className="mt-4 max-w-xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Keep your customer, or hand them to us.
            </h2>
            <p className="text-fd-muted-foreground mt-4 max-w-lg text-balance">
              The same money, the same settlement, the same webhook. The difference is only
              where your customer is standing when they pay.
            </p>
          </FadeInView>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                variant: 'charge' as const,
                path: 'POST /v1/collect/charge',
                title: 'Charge a number',
                body: 'You already have their phone number. We push the prompt; they approve without leaving your app.',
                needs: 'You collect the number and network.',
              },
              {
                variant: 'checkout' as const,
                path: 'POST /v1/collect/checkout',
                title: 'Hosted checkout',
                body: 'You get a link. They pick their own method on our page and come back when it is done.',
                needs: 'You collect nothing.',
              },
            ].map((c, i) => (
              <FadeInView key={c.path} delay={i * 0.08}>
                <div className="border-fd-border bg-fd-card hover:border-fd-primary/40 flex h-full flex-col rounded-xl border p-6 transition-colors sm:p-7">
                  <div className="mb-7">
                    <CollectionShape variant={c.variant} />
                  </div>
                  <code className="text-fd-muted-foreground text-xs break-all">{c.path}</code>
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

      {/* ── One request ──────────────────────────────────────────────── */}
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
              Flat body, no nesting, nothing inferred. You name the country, the network and
              the number — we never guess which, because a guessed network sends a prompt
              nobody can answer.
            </p>
            <dl className="mt-8 space-y-3 text-sm">
              {[
                ['202', 'Returns immediately. The prompt is on its way.'],
                ['collect.succeeded', 'Arrives at your webhook the moment it clears.'],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <dt className="text-fd-primary shrink-0 font-mono text-xs sm:w-40 sm:pt-0.5">{k}</dt>
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
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <FadeInView className="lg:order-2">
            <span className="text-fd-muted-foreground font-mono text-[0.7rem] tracking-[0.18em] uppercase">
              Disbursing
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              The same body, the other direction.
            </h2>
            <p className="text-fd-muted-foreground mt-4 max-w-md text-balance">
              Settle a seller, pay a supplier, send a refund. You name the network and the
              number exactly as you do for a charge — the endpoint is what changes.
            </p>
            <dl className="mt-8 space-y-3 text-sm">
              {[
                ['POST /v1/disburse', 'Money leaves your balance for any number on a supported network.'],
                ['disburse.succeeded', 'Fires when the recipient is credited, not when we accept the request.'],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <dt className="text-fd-primary shrink-0 font-mono text-xs sm:w-40 sm:pt-0.5">{k}</dt>
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
                  <dt className="text-fd-primary font-mono text-xs break-all">{f.term}</dt>
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
                className="bg-fd-primary text-fd-primary-foreground focus-visible:ring-fd-primary focus-visible:ring-offset-fd-background inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]"
              >
                Read the quickstart
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://tchokopay.com/merchant/developers"
                className="border-fd-border hover:bg-fd-secondary focus-visible:ring-fd-primary focus-visible:ring-offset-fd-background inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
              <Link href="/docs" className="hover:text-fd-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/docs/api-reference/charge" className="hover:text-fd-foreground transition-colors">
                API reference
              </Link>
              <Link
                href="https://tchokopay.com/merchant/developers"
                className="hover:text-fd-foreground transition-colors"
              >
                Dashboard
              </Link>
              <a href="mailto:tech@tchokopay.com" className="hover:text-fd-foreground transition-colors">
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
