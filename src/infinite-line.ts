import { Ellipse } from "./ellipse";
import { Point } from "./line-segment";

// Line in genral form: ax + by + c = 0
type InfiniteLine = { a: number; b: number; c: number };

// Calculate line equation in general form
export const getInfiniteLine = (p1: Point, p2: Point): InfiniteLine => {
  const [x1, y1] = p1,
    [x2, y2] = p2;
  const a = y2 - y1;
  const b = x1 - x2;
  const c = x2 * y1 - x1 * y2;
  return { a, b, c };
};

// Solved the mathmatical equation
export function getIntersectionsWithEllipse(
  { a: la, b: lb, c: lc }: InfiniteLine,
  { cx, cy, rx, ry }: Ellipse
): [Point, Point] | [Point] | [] {
  if (lb === 0) {
    const x01 = -(lc / la);
    const A = 1 / ry ** 2;
    const B = -(2 * cy) / ry ** 2;
    const C = cy ** 2 / ry ** 2 + (x01 - cx) ** 2 / rx ** 2 - 1;
    const D = B ** 2 - 4 * A * C;
    if (D > 0) {
      const y01 = (-B + Math.sqrt(D)) / (2 * A);
      const y02 = (-B - Math.sqrt(D)) / (2 * A);
      return [
        [x01, y01],
        [x01, y02],
      ];
    } else if (D === 0) {
      const y01 = -B / (2 * A);
      return [[x01, y01]];
    } else {
      return [];
    }
  }

  const m = -(la / lb);
  const c = -(lc / lb);

  const A = 1 / rx ** 2 + m ** 2 / ry ** 2;
  const B = -2 * (cx / rx ** 2 + (m * (cy - c)) / ry ** 2);
  const C = cx ** 2 / rx ** 2 + (c - cy) ** 2 / ry ** 2 - 1;

  const D = B ** 2 - 4 * A * C;
  if (D > 0) {
    const x01 = (-B + Math.sqrt(D)) / (2 * A);
    const y01 = m * x01 + c;
    const x02 = (-B - Math.sqrt(D)) / (2 * A);
    const y02 = m * x02 + c;
    return [
      [x01, y01],
      [x02, y02],
    ];
  } else if (D === 0) {
    const x01 = -B / (2 * A);
    const y01 = m * x01 + c;
    return [[x01, y01]];
  } else {
    return [];
  }
}
