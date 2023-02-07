import { LineSegment } from "../line-segment";
import { intersectsPolyline, Polyline } from "./polyline";

describe("intersectsPolyline", () => {
  describe("when intersects with thin line", () => {
    it("retruns true", () => {
      const l: LineSegment = [
        [5, 2],
        [3, 6],
      ];
      const p: Polyline = {
        type: "polyline",
        points: [
          [1, 5],
          [3, 3],
          [5, 5],
          [7, 3],
        ],
        strokeWidth: 1,
      };

      expect(intersectsPolyline(l, p, { threshold: 5 })).toEqual(true);
    });
  });

  describe("when intersects with thick line", () => {
    it("retruns true", () => {
      const l: LineSegment = [
        [6, 1],
        [6, 3],
      ];
      const p: Polyline = {
        type: "polyline",
        points: [
          [1, 5],
          [3, 3],
          [5, 5],
          [7, 3],
        ],
        strokeWidth: 3,
      };

      expect(intersectsPolyline(l, p, { threshold: 1 })).toEqual(true);
    });
  });
});
