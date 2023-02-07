import { Point } from "./line-segment";

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number; // radian. origin is top-left
};

export type Vertices = [Point, Point, Point, Point];

export const vertices = (rect: Rect): Vertices => {
  if (rect.angle !== 0) {
    throw new Error("angle is not 0"); // TODO: consider angle
  }

  const { x, y, width, height } = rect;
  return [
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height],
  ];
};
