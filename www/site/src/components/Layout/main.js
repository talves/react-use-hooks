import { h } from "preact";
import { Box } from "../Box.js";
import Container from "./container.js";

const MainWrapper = (props) => (
  <Box
    as="main"
    class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28"
    {...props}
  >
    {props.children}
  </Box>
);

const AppWrapper = ({ children, ...props }) => (
  <Box as="main" {...props}>
    {children}
  </Box>
);

const PageWrapper = (props) => (
  <MainWrapper class="py-6 bg-default flex md:flex-col lg:flex-row justify-center sm:py-12 min-h-80">
    <Container class="w-full">{props.children}</Container>
  </MainWrapper>
);

const ListPageWrapper = (props) => (
  <MainWrapper class="py-6 bg-default flex md:flex-col lg:flex-row justify-center sm:py-12 min-h-80">
    <Box class="w-full lg:w-1/4">{/* Placeholder for sidebar */}</Box>
    <Container class="w-full lg:w-1/2">{props.children}</Container>
    <Box class="w-full lg:w-1/4">{/* Placeholder for sidebar */}</Box>
  </MainWrapper>
);

export default (props) => {
  /* Determine if this is a page, list-page, item-page */
  const { props: childProps = {} } = props.children;
  let type = childProps.type || "page"; //default
  if (childProps.meta && !childProps.type)
    type = childProps.meta.type || "item-page";
  if (childProps.posts) type = "list-page";

  let Wrapper = PageWrapper;
  switch (type) {
    case "list-page":
    case "item-page":
      Wrapper = ListPageWrapper;
      break;
    case "app":
      Wrapper = AppWrapper;
      break;
  }

  return <Wrapper {...props} />;
};
