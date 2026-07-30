import { highlight } from 'fumadocs-core/highlight';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

/** macOS-style traffic-light dots — the visual shorthand for "this is a terminal." */
function TerminalDots() {
  return (
    <span className="flex items-center gap-1.5" aria-hidden>
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
    </span>
  );
}

/**
 * Server-rendered, syntax-highlighted code block for the landing page —
 * same Shiki themes/chrome (copy button, rounded card, border) the docs
 * pages get automatically from MDX, reused here since the landing page
 * isn't MDX and doesn't get that pipeline for free. `title` renders inside
 * CodeBlock's own header bar (native support, no second wrapper needed) —
 * pass `terminal` to prefix it with traffic-light dots.
 */
export async function HighlightedCode({
  code,
  lang,
  title,
  terminal = false,
  className,
}: {
  code: string;
  lang: string;
  title?: string;
  terminal?: boolean;
  className?: string;
}) {
  const rendered = await highlight(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    components: { pre: Pre },
  });

  return (
    <CodeBlock
      keepBackground
      className={className}
      title={
        title ? (
          <span className="flex items-center gap-2.5">
            {terminal && <TerminalDots />}
            <span className="text-fd-muted-foreground font-mono text-xs">{title}</span>
          </span>
        ) : undefined
      }
    >
      {rendered}
    </CodeBlock>
  );
}
