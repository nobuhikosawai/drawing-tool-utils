import { Ellipse } from "./ellipse";
import { Point } from "./line-segment";

export function isInsideEllipse(
  [x, y]: Point,
  { cx, cy, rx, ry }: Ellipse
): boolean {
  return (x - cx) ** 2 / rx ** 2 + (y - cy) ** 2 / ry ** 2 <= 1;
}

export const getPointBound = (p1: Point, p2: Point) => {
  const [x1, y1] = p1,
    [x2, y2] = p2;
  return {
    minX: Math.min(x1, x2),
    maxX: Math.max(x1, x2),
    minY: Math.min(y1, y2),
    maxY: Math.max(y1, y2),
  };
};
