import { h } from "preact";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/preact";
import { SiteDataProvider } from "./site-data-provider.js";

const components = {
  codeblock: (props) => (
    <div
      class="bg-gray-900"
      dangerouslySetInnerHTML={{ __html: props.children }}
    />
  ),
};

export default function PageWrapper(props) {
  return (
    <SiteDataProvider url="/settings.json">
      <MDXProvider components={components}>
        <div>
          <Helmet>
            <link rel="stylesheet" href="/styles.css" />
          </Helmet>
          {props.children}
        </div>
      </MDXProvider>
    </SiteDataProvider>
  );
}
