import { Point } from "./line-segment";

export const rotate = (p: Point, origin: Point, angle: number): Point => {
  const [x, y] = p;
  const [ox, oy] = origin;
  const cos = Math.cos(angle),
    sin = Math.sin(angle);
  return [
    (x - ox) * cos - (y - oy) * sin + ox,
    (x - ox) * sin + (y - oy) * cos + oy,
  ];
};
