import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared nav config between the landing page and the docs layout, so the
 * header stays identical whether you're on "/" or inside "/docs/...".
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      // "/ Merchant API" is dropped below `sm` — on a narrow phone, the nav
      // already has to fit the logo, a search trigger, and a theme toggle;
      // the full lockup only has room once the viewport does.
      <span className="flex items-center gap-2 font-semibold">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/tchokopay-logo.png" alt="" className="h-6 w-6 shrink-0 rounded" />
        <span>TchokoPay</span>
        <span className="text-fd-muted-foreground hidden font-normal sm:inline">/ Merchant API</span>
      </span>
    ),
  },
  links: [
    {
      text: 'Merchant Dashboard',
      url: 'https://tchokopay.com/merchant/developers',
    },
  ],
};
