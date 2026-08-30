/**
 * A nav label that rolls over on hover: the word leaves upward while an
 * identical copy arrives from below, so the link reads as a mechanism rather
 * than a colour change.
 *
 * The second copy is `aria-hidden` — it is the same word twice, and a screen
 * reader should hear it once. The movement itself lives in `global.css` under
 * `.slide`, keyed off the anchor's own `:hover`, because the anchor is
 * fumadocs' and not ours to put a group class on.
 */
export function SlideLabel({ children }: { children: string }) {
  return (
    <span className="slide">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}
