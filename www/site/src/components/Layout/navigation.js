import { h } from "preact";
import Navigation from "../Nav/index.js";

export default ({ children, ...props }) => (
  <Navigation {...props}>{children}</Navigation>
);
