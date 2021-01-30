import { h } from "preact";
import FooterSection from "./footer-section.js";

const FooterWrapper = (props) => (
  <footer {...props} class="w-full flex flex-col footer-background">
    <div class="overflow-x-auto my-auto">{props.children}</div>
  </footer>
);

export default (props) => {
  return (
    <FooterWrapper>
      <FooterSection />
    </FooterWrapper>
  );
};
