import { Point } from "./line-segment";
import { rotate } from "./math";

describe("rotate", () => {
  it("rotates 180 degree", () => {
    const init: Point = [1, 0],
      origin: Point = [0, 0],
      angle = Math.PI;
    const rotated = rotate(init, origin, angle);
    expect(rotated[0]).toEqual(-1);
    expect(rotated[1]).toBeCloseTo(0);
  });

  it("rotates -90 degree", () => {
    const init: Point = [1, 1],
      origin: Point = [0, 0],
      angle = -Math.PI / 2;
    const rotated = rotate(init, origin, angle);
    expect(rotated[0]).toEqual(1);
    expect(rotated[1]).toBeCloseTo(-1);
  });
});
