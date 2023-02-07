import { rotate } from "./math";
import { Rect, vertices } from "./rect";

export type Point = [number, number];
export type LineSegment = [Point, Point];

// https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment
export const intersectsLineSegment = (
  l1: LineSegment,
  l2: LineSegment
): boolean => {
  const [p1, p2] = l1,
    [p3, p4] = l2;
  const [x1, y1] = p1,
    [x2, y2] = p2,
    [x3, y3] = p3,
    [x4, y4] = p4;

  const D = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (D === 0) {
    return false;
  }

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / D;
  const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / D;

  // intersection is [x1 + t * (x2 - x1), y1 + t * (y2 - y1)]
  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
};

export const intersectsRect = (l: LineSegment, rect: Rect): boolean => {
  if (rect.angle !== 0) {
    const rotatedL = rotateLineSegment(l, [rect.x, rect.y], -rect.angle);
    const straitRect = { ...rect, angle: 0 };
    return !!clipWithRect(rotatedL, straitRect);
  } else {
    return !!clipWithRect(l, rect);
  }
};

export const rotateLineSegment = (
  l: LineSegment,
  origin: Point,
  angle: number
): LineSegment => {
  const [p1, p2] = l;

  return [rotate(p1, origin, angle), rotate(p2, origin, angle)];
};

// https://en.wikipedia.org/wiki/Liang%E2%80%93Barsky_algorithm
export const clipWithRect = (
  lineSegment: LineSegment,
  rect: Rect
): LineSegment | null => {
  const [x1, y1] = lineSegment[0],
    [x2, y2] = lineSegment[1];

  const v = vertices(rect);
  const minX = Math.min(v[0][0], v[2][0]);
  const maxX = Math.max(v[0][0], v[2][0]);
  const minY = Math.min(v[0][1], v[2][1]);
  const maxY = Math.max(v[0][1], v[2][1]);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const p1 = -dx;
  const p2 = dx;
  const p3 = -dy;
  const p4 = dy;
  const q1 = x1 - minX;
  const q2 = maxX - x1;
  const q3 = y1 - minY;
  const q4 = maxY - y1;

  let minT = 0,
    maxT = 1;

  const negatives: number[] = [],
    positives: number[] = [];

  if (
    (p1 === 0 && q1 < 0) ||
    (p2 === 0 && q2 < 0) ||
    (p3 === 0 && q3 < 0) ||
    (p4 === 0 && q4 < 0)
  ) {
    return null; // Line is parallel to clipping window
  }
  if (p1 !== 0) {
    const r1 = q1 / p1;
    const r2 = q2 / p2;
    if (p1 < 0) {
      negatives.push(r1);
      positives.push(r2);
    } else {
      negatives.push(r2);
      positives.push(r1);
    }
  }
  if (p3 !== 0) {
    const r3 = q3 / p3;
    const r4 = q4 / p4;
    if (p3 < 0) {
      negatives.push(r3);
      positives.push(r4);
    } else {
      negatives.push(r4);
      positives.push(r3);
    }
  }
  minT = Math.max(0, ...negatives);
  maxT = Math.min(1, ...positives);
  if (minT > maxT) {
    return null;
  }
  const x01 = x1 + minT * dx;
  const y01 = y1 + minT * dy;
  const x02 = x1 + maxT * dx;
  const y02 = y1 + maxT * dy;

  return [
    [x01, y01],
    [x02, y02],
  ];
};
