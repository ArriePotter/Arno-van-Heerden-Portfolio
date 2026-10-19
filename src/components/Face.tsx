import styles from "./Face.module.css";

// Hand-coded line drawing (moodboard: "Showcase Image Moodboard", anatomy-plate references).
// At rest: a profile with few lines. On hover: the anatomy draws in like a medical plate, and
// only the eye → brain connection is in the brand colour ("the visual intake of humans").
// Each anatomy line has pathLength=1 so CSS can draw it from 0 to 1; --d staggers the start.
const draw = (ms: number) => ({
  pathLength: 1,
  className: styles.draw,
  style: { "--d": `${ms}ms` } as React.CSSProperties,
});

export function Face({ className, ref }: { className?: string; ref?: React.Ref<SVGSVGElement> }) {
  return (
    <svg
      ref={ref}
      className={`${styles.face} ${className ?? ""}`}
      viewBox="0 0 420 600"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* At rest: outline, ear, eye. */}
      <g className={styles.profile}>
        <path d="M150 590C150 520 140 470 120 430C70 380 50 300 60 230C72 120 150 50 240 48C320 46 352 110 352 170C352 200 350 215 360 232C364 240 358 250 360 258C372 285 392 312 394 328C395 340 382 345 368 347C372 356 376 364 368 372C374 380 372 390 362 396C366 412 364 432 350 446C330 462 300 462 280 468C270 500 268 540 272 590" />
        {/* The ear steps aside on hover so the optic path reads clearly. */}
        <path className={styles.ear} d="M205 255C180 245 168 280 178 300C184 316 200 318 206 302" />
        <path d="M318 258C328 250 342 251 349 258C341 265 326 265 318 258Z" />
      </g>

      {/* On hover: the anatomy plate. */}
      <g className={styles.anatomy}>
        {/* Cerebrum, its folds, cerebellum, brain stem, eyeball. */}
        <path {...draw(0)} d="M318 225C340 190 335 130 290 100C245 70 160 75 115 120C80 155 75 230 100 285C115 312 150 318 180 305C205 318 240 320 262 300C285 290 300 260 318 225Z" />
        <path {...draw(120)} d="M140 130C170 115 200 135 230 120" />
        <path {...draw(160)} d="M250 108C262 138 246 160 266 182" />
        <path {...draw(200)} d="M120 182C150 162 170 192 205 172C230 162 250 182 285 160" />
        <path {...draw(240)} d="M115 236C140 216 165 246 195 226" />
        <path {...draw(280)} d="M222 222C247 207 272 232 300 205" />
        <path {...draw(320)} d="M302 246C262 240 230 255 192 262" />
        <path {...draw(360)} d="M115 300C110 330 140 350 175 342C195 337 200 318 190 306" />
        <path {...draw(420)} d="M126 316C146 326 166 323 182 316M132 331C150 338 168 334 180 328" />
        <path {...draw(460)} d="M205 315C210 345 205 380 200 420M232 312C234 345 230 385 224 420" />
        <circle {...draw(200)} cx="333" cy="258" r="14" />

        {/* Notes: leader lines to small mono labels. */}
        <g className={styles.notes}>
          <path d="M333 244V22H300" />
          <text x="296" y="25" textAnchor="end">Eye · input</text>
          <path d="M104 262L34 170V150" />
          <text x="6" y="144">Visual cortex</text>
          <path d="M190 283L70 470" />
          <text x="6" y="482">Thalamus</text>
          <path d="M246 270L120 515" />
          <text x="6" y="527">Optic chiasm</text>
          <text className={styles.caption} x="6" y="592">Fig. 1 · Visual intake</text>
        </g>

        {/* The one coloured idea: light enters the eye and travels to the visual cortex. */}
        <g className={styles.why}>
          <path className={styles.light} d="M420 236L350 254M420 258H350M420 280L350 262" />
          <path {...draw(500)} d="M320 258C292 262 266 266 246 270C216 277 192 286 170 281C146 276 122 270 104 262" />
          <circle style={{ "--d": "700ms" } as React.CSSProperties} cx="246" cy="270" r="3.5" />
          <circle style={{ "--d": "800ms" } as React.CSSProperties} cx="190" cy="283" r="3.5" />
          <circle style={{ "--d": "950ms" } as React.CSSProperties} cx="104" cy="262" r="6" />
        </g>
      </g>
    </svg>
  );
}
