import styles from "./TopBlur.module.css";

// A displacement map: no shift at the bottom (G = 128), pulling pixels up from below more
// and more towards the top (G → 255). Fed to feDisplacementMap, it stretches content upwards
// as it slides under the bar, like taffy.
const map =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" preserveAspectRatio="none"><defs><linearGradient id="g" x2="0" y2="1"><stop offset="0" stop-color="rgb(128,255,128)"/><stop offset="1" stop-color="rgb(128,128,128)"/></linearGradient></defs><rect width="10" height="10" fill="url(#g)"/></svg>`,
  );

// Under the top bar (moodboard: "blur effect on the bottom of the screen"): content stretches,
// then blurs more and more towards the top. The stretch is Chromium-only (SVG filters in
// backdrop-filter); other browsers get the blur alone.
export function TopBlur() {
  return (
    <div className={styles.root} aria-hidden="true">
      <svg className={styles.defs} width="0" height="0">
        <filter id="top-stretch" x="0" y="0" width="4000" height="200" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feImage href={map} preserveAspectRatio="none" x="0" y="0" width="4000" height="200" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="90" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className={styles.stretch} />
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className={styles.layer} />
      ))}
    </div>
  );
}
