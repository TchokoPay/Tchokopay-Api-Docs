import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SlideLabel } from './slide-label';

/**
 * Shared nav config between the landing page and the docs layout, so the
 * header stays identical whether you're on "/" or inside "/docs/...".
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="flex items-center gap-2 font-semibold">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/tchokopay-logo.png" alt="" className="h-6 w-6 shrink-0 rounded" />
        <span>TchokoPay</span>
      </span>
    ),
  },
  links: [
    {
      text: <SlideLabel>Merchant Dashboard</SlideLabel>,
      url: 'https://tchokopay.com/merchant/developers',
    },
  ],
};
