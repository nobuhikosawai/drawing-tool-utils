import { vertices } from "./rect";

describe("rect", () => {
  it("calc vertices for angle 0", () => {
    const rect = {
      x: 10,
      y: 10,
      width: 20,
      height: 30,
      angle: 0,
    };
    expect(vertices(rect)).toEqual([
      [10, 10],
      [30, 10],
      [30, 40],
      [10, 40],
    ]);
  });
});
