import { h } from "preact";

export const Box = ({ as = "div", children, ...props }) => {
  return h(as, props, children);
};
