import Link from 'next/link';
import { ArrowRight, ShieldCheck, Globe2, Webhook, ListChecks } from 'lucide-react';
import { HighlightedCode } from './hero-code';
import { Stagger, FadeUp, FadeInView } from './animated';

const features = [
  {
    icon: Globe2,
    title: 'Multi-currency',
    body: 'Price a payment in any currency — settle net of fees in whatever your customer actually paid with.',
  },
  {
    icon: Webhook,
    title: 'Signed webhooks',
    body: 'Get notified the moment a payment resolves. Every delivery is HMAC-signed and replay-protected.',
  },
  {
    icon: ShieldCheck,
    title: 'Key-scoped access',
    body: 'Generate, rotate, and revoke API keys yourself. Revocation takes effect immediately, no delay.',
  },
  {
    icon: ListChecks,
    title: 'Idempotent by default',
    body: 'Retry any request safely with an Idempotency-Key — never risk a duplicate charge.',
  },
];

const requestSample = `curl -X POST https://connect.tchokopay.com/v1/payments \\
  -H "Authorization: Bearer tchoko_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 5000,
    "currency": "XAF",
    "description": "Order #4821"
  }'`;

const responseSample = `{
  "reference": "REQ-1785296850838-A5303B",
  "status": "PENDING",
  "amount": 5000,
  "currency": "XAF",
  "requestedAmount": 5000,
  "requestedCurrency": "XAF",
  "checkoutUrl": "https://tchokopay.com/pay/REQ-...",
  "expiresAt": "2026-07-30T10:00:00.000Z"
}`;

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col overflow-x-hidden">
      <section className="border-fd-border relative border-b">
        <div aria-hidden className="bg-grid-pattern pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="from-fd-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-b via-transparent to-transparent"
        />
        <Stagger className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
          <FadeUp>
            <span className="border-fd-border bg-fd-secondary text-fd-muted-foreground inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
              Merchant API — v1
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              Accept payments from your own backend.
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-fd-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-balance">
              Create a payment, redirect your customer to a hosted checkout page, get notified when
              it&apos;s done. No payment UI to build, no mobile-money integration to maintain.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/docs"
                className="bg-fd-primary text-fd-primary-foreground inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs/api-reference/create-payment"
                className="border-fd-border hover:bg-fd-secondary inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors"
              >
                API reference
              </Link>
            </div>
          </FadeUp>
        </Stagger>
      </section>

      <FadeInView>
        <section className="mx-auto w-full max-w-5xl px-6 py-16">
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className="text-fd-muted-foreground text-xs font-medium tracking-wide uppercase">
                Request
              </span>
              <HighlightedCode code={requestSample} lang="bash" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-fd-muted-foreground text-xs font-medium tracking-wide uppercase">
                Response
              </span>
              <HighlightedCode code={responseSample} lang="json" />
            </div>
          </div>
        </section>
      </FadeInView>

      <section className="border-fd-border border-t">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <FadeInView key={f.title} delay={i * 0.05}>
                <div className="border-fd-border bg-fd-card hover:border-fd-primary/40 group flex h-full flex-col gap-3 rounded-xl border p-6 transition-colors">
                  <div className="bg-fd-primary/10 text-fd-primary flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110">
                    <f.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-medium">{f.title}</h3>
                  <p className="text-fd-muted-foreground text-sm leading-relaxed text-balance">{f.body}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <FadeInView>
        <section className="border-fd-border border-t">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-20 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to accept your first payment?
            </h2>
            <p className="text-fd-muted-foreground max-w-md text-sm">
              Generate an API key from your dashboard and you&apos;re creating real checkout links
              in minutes.
            </p>
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/docs/quickstart"
                className="bg-fd-primary text-fd-primary-foreground inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm transition-transform duration-150 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
              >
                Read the quickstart
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://tchokopay.com/merchant/developers"
                className="text-fd-muted-foreground hover:text-fd-foreground text-sm font-medium underline-offset-4 transition-colors hover:underline"
              >
                Get your API key →
              </Link>
            </div>
          </div>
        </section>
      </FadeInView>
    </main>
  );
}
