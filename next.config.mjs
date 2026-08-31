import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'tchokopay.com' }],
  },
  // Pages renamed when the API moved to collect/disburse. Anything already
  // linking to the old URLs — a merchant's bookmark, an email we sent — still
  // lands on the right page.
  async redirects() {
    return [
      { source: '/docs/guides/payouts', destination: '/docs/guides/disbursing', permanent: true },
      { source: '/docs/api-reference/create-payment', destination: '/docs/api-reference/create-checkout', permanent: true },
      { source: '/docs/api-reference/get-payment', destination: '/docs/api-reference/get-collection', permanent: true },
      { source: '/docs/api-reference/create-payout', destination: '/docs/api-reference/create-disbursement', permanent: true },
      { source: '/docs/api-reference/get-payout', destination: '/docs/api-reference/get-disbursement', permanent: true },
      { source: '/docs/api-reference/payout-limits', destination: '/docs/api-reference/disburse-limits', permanent: true },
      { source: '/docs/api-reference/list-channels', destination: '/docs/api-reference/account-providers', permanent: true },
    ];
  },
};

export default withMDX(config);
