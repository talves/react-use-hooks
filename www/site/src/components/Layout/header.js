import { h } from "preact";
import { Box } from "../Box.js";
import NavigationBar from "../NavigationBar/index.js";
import Navigation from "../Nav/index.js";

const HeaderWrapper = (props) => (
  <Box as="header" {...props}>
    {props.children}
  </Box>
);

export const ThemeSwitcher = (props) => (
  <Box as="div" {...props}>
    {props.children}
  </Box>
);

export default (props) => {
  return (
    <NavigationBar {...props}>
      <Navigation class="absolute top-0 right-0" />
    </NavigationBar>
  );
};
