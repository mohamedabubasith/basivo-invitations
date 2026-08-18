/**
 * One-time SVG definitions:
 *  - #arch : pointed-arch (mihrab) clip-path for the couple's photo frames.
 * (No decorative star/geometric motifs — the atmosphere is carried by the gold
 *  particle field, arches, gold typography, and elegant line flourishes.)
 */
export function SvgDefs() {
  return (
    <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="arch" clipPathUnits="objectBoundingBox">
          <path d="M0,1 L0,0.42 Q0.09,0 0.5,0 Q0.91,0 1,0.42 L1,1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
