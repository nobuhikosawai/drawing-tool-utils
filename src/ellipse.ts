export type Ellipse = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
};

export const getEllipseBound = (ellipse: Ellipse) => {
  const { cx, cy, rx, ry } = ellipse;
  return {
    left: cx - rx,
    right: cx + rx,
    top: cy - ry,
    bottom: cy + ry,
  };
};
