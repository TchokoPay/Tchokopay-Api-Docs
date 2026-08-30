import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { JetBrains_Mono, Sora } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

// Same brand font/weights as tchokopay-frontend (app/layout.tsx) — keeps the
// docs site typographically consistent with the product instead of falling
// back to a docs-framework default.
const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

// Monospace is not decoration here: the page uses it to mark machine
// vocabulary — endpoints, statuses, references, and the two verbs the API is
// named around — so it needs a real face, not whatever the OS supplies.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-brand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TchokoPay Merchant API',
    template: '%s | TchokoPay Merchant API',
  },
  description:
    'Take mobile money payments and send them back out, from your own backend. Two verbs — collect and disburse — with signed webhooks and idempotent requests.',
  metadataBase: new URL('https://docs.tchokopay.com'),
  icons: {
    icon: '/favicon.png',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/*
          Marks the document as scripted, before first paint, so CSS can hide
          scroll-revealed content only where something exists to reveal it.
          Without this the page would serve invisible sections to anything that
          does not run scripts — crawlers included.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
