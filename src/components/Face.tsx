// Profile exported from Figma (A v3 · 01 Cover → "Face · neural profile"); colours swapped for
// tokens. The brain network was redrawn in code (19 Oct) to read more like a brain.
export function Face({ className, ref }: { className?: string; ref?: React.Ref<SVGSVGElement> }) {
  return (
    <svg ref={ref} className={className} viewBox="0 0 420 600" fill="none" aria-hidden="true">
      <path
        d="M60 40C160 0 300 20 330 140C340 180 335 200 345 225C350 240 345 250 355 262C375 290 395 320 392 335C390 345 370 348 362 352C368 362 372 370 364 378C372 386 370 396 360 402C362 420 360 440 340 452C320 462 290 462 270 470C262 500 262 530 268 590"
        stroke="var(--color-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* A brain, side view, as a network: the outline (cerebrum), a lighter web of
          connections inside, the cerebellum at the back and the brain stem below. */}
      <g stroke="var(--color-why)" strokeLinejoin="round">
        <path d="M292 172L306 142L298 108L270 80L230 66L186 68L146 86L120 118L118 152L136 178L176 190L216 194L252 190L278 183Z" opacity="0.85" strokeWidth="1.25" />
        <path d="M292 172L268 136M306 142L268 136M298 108L268 136M270 80L248 104M230 66L205 98M230 66L248 104M186 68L205 98M146 86L162 110M146 86L132 108M120 118L146 138M120 118L132 108M118 152L146 138M136 178L146 138M136 178L128 190M176 190L198 168M176 190L174 210M176 190L198 212M216 194L238 166M216 194L198 168M216 194L198 212M252 190L238 166M278 183L238 166M205 98L222 134M248 104L222 134M248 104L268 136M162 110L178 146M162 110L146 138M162 110L132 108M222 134L238 166M178 146L146 138M178 146L198 168M128 190L150 206M150 206L174 210M174 210L198 212M198 212L202 244" opacity="0.45" />
      </g>
      <g fill="var(--color-why)">
        <circle cx="292" cy="172" r="4.5" />
        <circle cx="306" cy="142" r="5" />
        <circle cx="298" cy="108" r="4" />
        <circle cx="270" cy="80" r="5.5" />
        <circle cx="230" cy="66" r="4.5" />
        <circle cx="186" cy="68" r="4" />
        <circle cx="146" cy="86" r="5" />
        <circle cx="120" cy="118" r="4" />
        <circle cx="118" cy="152" r="4.5" />
        <circle cx="136" cy="178" r="4" />
        <circle cx="176" cy="190" r="3.5" />
        <circle cx="216" cy="194" r="4" />
        <circle cx="252" cy="190" r="4.5" />
        <circle cx="278" cy="183" r="4" />
        <circle cx="205" cy="98" r="4.5" />
        <circle cx="248" cy="104" r="5" />
        <circle cx="162" cy="110" r="4" />
        <circle cx="222" cy="134" r="6" />
        <circle cx="268" cy="136" r="4.5" />
        <circle cx="178" cy="146" r="4" />
        <circle cx="146" cy="138" r="4" />
        <circle cx="238" cy="166" r="4.5" />
        <circle cx="198" cy="168" r="3.5" />
        <circle cx="132" cy="108" r="4" />
        <circle cx="128" cy="190" r="3.5" />
        <circle cx="150" cy="206" r="3" />
        <circle cx="174" cy="210" r="3.5" />
        <circle cx="198" cy="212" r="3" />
        <circle cx="202" cy="244" r="2.5" />
      </g>
    </svg>
  );
}
