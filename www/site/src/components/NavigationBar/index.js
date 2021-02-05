import { h } from "preact";
import { Box } from "../Box.js";

const NavigationBarWrapper = (props) => {
  return (
    <Box as="header" {...props} className={props.className}>
      {props.children}
    </Box>
  );
};

export const ThemeSwitcher = (props) => (
  <Box as="div" {...props}>
    {props.children}
  </Box>
);

const NavigationBar = (props) => {
  return (
    <NavigationBarWrapper className="relative flex flex-row h-18 p-2 bg-transparent font-medium text-fire-900">
      <Box className="flex">
        <Box as="a" href="/" className="flex-item">
          <Box
            as="span"
            className="text-4xl font-semibold my-auto italic text-fire"
          >
            {props.header}
          </Box>
        </Box>
      </Box>
      {props.children}
      <Box className="float-right absolute right-0">
        <ThemeSwitcher displayMode={false} />
      </Box>
    </NavigationBarWrapper>
  );
};

export default NavigationBar;
