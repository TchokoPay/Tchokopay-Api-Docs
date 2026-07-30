import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Sora } from 'next/font/google';
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

export const metadata: Metadata = {
  title: {
    default: 'TchokoPay Merchant API',
    template: '%s | TchokoPay Merchant API',
  },
  description:
    'Accept payments from your own backend with the TchokoPay Merchant API — hosted checkout, multi-currency pricing, and signed webhooks.',
  metadataBase: new URL('https://docs.tchokopay.com'),
  icons: {
    icon: '/favicon.png',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={sora.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
