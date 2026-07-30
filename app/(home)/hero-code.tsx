import { highlight } from 'fumadocs-core/highlight';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

/**
 * Server-rendered, syntax-highlighted code block for the landing page —
 * same Shiki themes/chrome (copy button, rounded card, border) the docs
 * pages get automatically from MDX, reused here since the landing page
 * isn't MDX and doesn't get that pipeline for free.
 */
export async function HighlightedCode({ code, lang }: { code: string; lang: string }) {
  const rendered = await highlight(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    components: { pre: Pre },
  });

  return <CodeBlock keepBackground>{rendered}</CodeBlock>;
}
