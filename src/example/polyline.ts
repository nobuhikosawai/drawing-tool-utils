import {
  intersectsLineSegment,
  intersectsRect,
  LineSegment,
  Point,
} from "../line-segment";
import { Rect } from "../rect";

const lineToRect = (p1: Point, p2: Point, strokeWidth: number): Rect => {
  const [x1, y1] = p1,
    [x2, y2] = p2;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);

  if (length === 0) {
    throw new Error("Unable to convert to Rect");
  }

  const cos = dx / length;
  const sin = dy / length;

  const opp = (strokeWidth * sin) / 2;
  const adj = (strokeWidth * cos) / 2;

  return {
    x: x1 - opp,
    y: y1 + adj,
    width: length,
    height: strokeWidth,
    angle: Math.acos(adj),
  };
};

export type Polyline = {
  type: "polyline";
  points: Point[];
  strokeWidth: number;
};

type Option = {
  threshold: number;
};

export const intersectsPolyline = (
  l: LineSegment,
  polyline: Polyline,
  option: Option
): boolean => {
  if (polyline.strokeWidth > option.threshold) {
    for (let i = 0; i < polyline.points.length - 1; i++) {
      const p1 = polyline.points[i];
      const p2 = polyline.points[i + 1];

      const rect = lineToRect(p1, p2, polyline.strokeWidth);
      return intersectsRect(l, rect);
    }
    return false;
  } else {
    for (let i = 0; i < polyline.points.length - 1; i++) {
      const p1 = polyline.points[i];
      const p2 = polyline.points[i + 1];

      const interscting = intersectsLineSegment(l, [p1, p2]);
      if (interscting) {
        return true;
      }
    }
    return false;
  }
};
