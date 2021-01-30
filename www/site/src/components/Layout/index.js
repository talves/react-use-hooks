import { h } from "preact";
import { Helmet } from "react-helmet";
import Header from "./header.js";
import Main from "./main.js";
import Footer from "./footer.js";
import SEO from "../seo/index.js";

export const FlexLayout = (props) => <div {...props}>{props.children}</div>;

export default ({ children, ...props }) => {
  return (
    <FlexLayout>
      <Helmet>
        <html lang="en" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffc40d"></meta>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>
      <SEO pageMeta={props.meta} />
      <Header header={props.header} />
      <Main {...props}>{children}</Main>
      <Footer />
    </FlexLayout>
  );
};

export { Main, Header, Footer, SEO };
