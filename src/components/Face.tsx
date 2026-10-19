// Exported from Figma (A v3 · 01 Cover → "Face · neural profile"); colours swapped for tokens.
export function Face({ className, ref }: { className?: string; ref?: React.Ref<SVGSVGElement> }) {
  return (
    <svg ref={ref} className={className} viewBox="0 0 420 600" fill="none" aria-hidden="true">
      <path
        d="M60 40C160 0 300 20 330 140C340 180 335 200 345 225C350 240 345 250 355 262C375 290 395 320 392 335C390 345 370 348 362 352C368 362 372 370 364 378C372 386 370 396 360 402C362 420 360 440 340 452C320 462 290 462 270 470C262 500 262 530 268 590"
        stroke="var(--color-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M265 140L210 95L150 120L165 190L230 200L265 140ZM150 120L230 200M210 95L230 200M265 140L165 190"
        stroke="var(--color-why)"
        opacity="0.6"
      />
      <g fill="var(--color-why)">
        <circle cx="150" cy="120" r="5" />
        <circle cx="210" cy="95" r="5" />
        <circle cx="265" cy="140" r="6" />
        <circle cx="230" cy="200" r="5" />
        <circle cx="165" cy="190" r="4" />
      </g>
    </svg>
  );
}
