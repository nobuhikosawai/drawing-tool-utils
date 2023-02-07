import { Ellipse } from "./ellipse";
import { Point, LineSegment } from "./line-segment";
import { distanceToEllipse, distanceToLineSegment } from "./point";

describe("distanceToLineSegment", () => {
  it("calc distance", () => {
    const p: Point = [3, 1];
    const l: LineSegment = [
      [1, 3],
      [5, 3],
    ];

    expect(distanceToLineSegment(p, l)).toEqual(2);
  });
});

describe("distanceToEllipse", () => {
  it("returns line segment", () => {
    const p: Point = [5, 1];
    const ellipse: Ellipse = {
      cx: 5,
      cy: 4,
      rx: 3,
      ry: 2,
    };

    expect(distanceToEllipse(p, ellipse)).toBeCloseTo(1);
  });
});
