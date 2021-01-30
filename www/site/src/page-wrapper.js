import { h } from "preact";
import { MDXProvider } from "@mdx-js/preact";
import { SiteDataProvider } from "./site-data-provider.js";
import Layout from "./components/Layout/index.js";

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
        <Layout header="Use Hooks (talves)">{props.children}</Layout>
      </MDXProvider>
    </SiteDataProvider>
  );
}
