import { Ellipse } from "./ellipse";
import {
  clipWithEllipse,
  clipWithRect,
  intersectsEllipse,
  intersectsLineSegment,
  intersectsRect,
  LineSegment,
  Point,
  rotateLineSegment,
} from "./line-segment";
import { Rect } from "./rect";

describe("intersectsLineSegment", () => {
  describe("when intersects", () => {
    it("returns true", () => {
      const l1: LineSegment = [
        [1, 1],
        [3, 3],
      ];
      const l2: LineSegment = [
        [3, 1],
        [1, 3],
      ];
      expect(intersectsLineSegment(l1, l2)).toEqual(true);
    });
  });

  describe("when intersects vertical", () => {
    it("returns true", () => {
      const l1: LineSegment = [
        [1, 1],
        [3, 1],
      ];
      const l2: LineSegment = [
        [2, 0],
        [2, 3],
      ];
      expect(intersectsLineSegment(l1, l2)).toEqual(true);
    });
  });

  describe("when not intersects", () => {
    it("returns false", () => {
      const l1: LineSegment = [
        [1, 1],
        [3, 2],
      ];
      const l2: LineSegment = [
        [1, 4],
        [3, 3],
      ];
      expect(intersectsLineSegment(l1, l2)).toEqual(false);
    });
  });
});

describe("intersectsRect", () => {
  describe("when intersects", () => {
    it("returns true", () => {
      const l: LineSegment = [
        [3, 2],
        [6, 5],
      ];

      const rect: Rect = {
        x: 2,
        y: 3,
        width: 3,
        height: 3,
        angle: 0,
      };

      expect(intersectsRect(l, rect)).toEqual(true);
    });
  });

  describe("when not intersects", () => {
    it("returns false", () => {
      const l: LineSegment = [
        [5, 2],
        [7, 3],
      ];

      const rect: Rect = {
        x: 2,
        y: 3,
        width: 3,
        height: 3,
        angle: 0,
      };

      expect(intersectsRect(l, rect)).toEqual(false);
    });
  });
});

describe("rotateLineSegment", () => {
  describe("rotate 90 degree", () => {
    it("rotate", () => {
      const l: LineSegment = [
        [5, 1],
        [7, 3],
      ];
      const origin: Point = [5, 1];
      const angle = Math.PI / 2;

      expect(rotateLineSegment(l, origin, angle)).toEqual([
        [5, 1],
        [3, 3],
      ]);
    });
  });
});

describe("clipWithRect", () => {
  describe("when intersects in the middle of line segment", () => {
    it("returns intersection", () => {
      const l: LineSegment = [
        [3, 2],
        [6, 5],
      ];

      const rect: Rect = {
        x: 2,
        y: 3,
        width: 3,
        height: 3,
        angle: 0,
      };

      expect(clipWithRect(l, rect)).toEqual([
        [4, 3],
        [5, 4],
      ]);
    });
  });

  describe("when one end is in the rect", () => {
    it("returns intersection", () => {
      const l: LineSegment = [
        [1, 3],
        [3, 5],
      ];

      const rect: Rect = {
        x: 2,
        y: 3,
        width: 3,
        height: 3,
        angle: 0,
      };

      expect(clipWithRect(l, rect)).toEqual([
        [2, 4],
        [3, 5],
      ]);
    });
  });

  describe("when in the rect", () => {
    it("returns intersection", () => {
      const l: LineSegment = [
        [3, 4],
        [4, 5],
      ];

      const rect: Rect = {
        x: 2,
        y: 3,
        width: 3,
        height: 3,
        angle: 0,
      };

      expect(clipWithRect(l, rect)).toEqual([
        [3, 4],
        [4, 5],
      ]);
    });
  });

  describe("when not intersects", () => {
    it("returns false", () => {
      const l: LineSegment = [
        [5, 2],
        [7, 3],
      ];

      const rect: Rect = {
        x: 2,
        y: 3,
        width: 3,
        height: 3,
        angle: 0,
      };

      expect(clipWithRect(l, rect)).toBeNull();
    });
  });
});

describe("intersectsEllipse", () => {
  describe("when intersects", () => {
    it("returns true", () => {
      const l: LineSegment = [
        [8, 1],
        [5, 7],
      ];
      const ellipse: Ellipse = {
        cx: 5,
        cy: 4,
        rx: 3,
        ry: 2,
      };
      expect(intersectsEllipse(l, ellipse)).toEqual(true);
    });
  });

  describe("when not intersects", () => {
    it("returns true", () => {
      const l: LineSegment = [
        [8, 1],
        [10, 7],
      ];
      const ellipse: Ellipse = {
        cx: 5,
        cy: 4,
        rx: 3,
        ry: 2,
      };
      expect(intersectsEllipse(l, ellipse)).toEqual(false);
    });
  });
});

describe("clipWithEllipse", () => {
  describe("when intersects", () => {
    it("returns line segment", () => {
      const l: LineSegment = [
        [2, 0],
        [11, 6],
      ];
      const ellipse: Ellipse = {
        cx: 5,
        cy: 4,
        rx: 3,
        ry: 2,
      };

      const clipped = clipWithEllipse(l, ellipse);
      expect(clipped![0][0]).toBeCloseTo(8);
      expect(clipped![0][1]).toBeCloseTo(4);
      expect(clipped![1][0]).toBeCloseTo(5);
      expect(clipped![1][1]).toBeCloseTo(2);
    });
  });

  describe("when not intersects", () => {
    it("returns null", () => {
      const l: LineSegment = [
        [8, 1],
        [10, 7],
      ];
      const ellipse: Ellipse = {
        cx: 5,
        cy: 4,
        rx: 3,
        ry: 2,
      };
      expect(clipWithEllipse(l, ellipse)).toBeNull();
    });
  });
});
