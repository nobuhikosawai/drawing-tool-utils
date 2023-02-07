import { Ellipse } from "./ellipse";
import { LineSegment, Point } from "./line-segment";

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

const distance = (p1: Point, p2: Point): number => {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  return Math.hypot(x2 - x1, y2 - y1);
};

// https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment#comment87713907_849211
export const distanceToLineSegment = (p: Point, lineSegment: LineSegment) => {
  const [x, y] = p,
    [x1, y1] = lineSegment[0],
    [x2, y2] = lineSegment[1];
  if (x1 === x2 && y1 === y2) {
    return distance(p, lineSegment[0]);
  }
  let t =
    ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) /
    ((x2 - x1) ** 2 + (y2 - y1) ** 2);
  t = Math.max(0, Math.min(1, t));
  const x0 = x1 + t * (x2 - x1),
    y0 = y1 + t * (y2 - y1);
  return distance(p, [x0, y0]);
};

// https://stackoverflow.com/a/46007540
export const distanceToEllipse = (p: Point, ellipse: Ellipse): number => {
  const [x, y] = p;
  const { cx, cy, rx: a, ry: b } = ellipse;
  const px = Math.abs(x - cx),
    py = Math.abs(y - cy); // related to the ellipse center

  let tx = 0.707;
  let ty = 0.707;
  [0, 1, 2, 3].forEach((_) => {
    const xx = a * tx;
    const yy = b * ty;

    const ex = ((a * a - b * b) * tx ** 3) / a;
    const ey = ((b * b - a * a) * ty ** 3) / b;

    const rx = xx - ex;
    const ry = yy - ey;

    const qx = px - ex;
    const qy = py - ey;

    const r = Math.hypot(ry, rx);
    const q = Math.hypot(qy, qx);

    tx = Math.min(1, Math.max(0, ((qx * r) / q + ex) / a));
    ty = Math.min(1, Math.max(0, ((qy * r) / q + ey) / b));
    const t = Math.hypot(ty, tx);
    tx /= t;
    ty /= t;
  });

  const closestPoint: Point = [a * tx, b * ty];
  return distance([px, py], closestPoint);
};
