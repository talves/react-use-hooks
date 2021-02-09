import { h } from "preact";
import { MDXProvider } from "@mdx-js/preact";
import { SiteDataProvider } from "./site-data-provider.js";
import Layout from "./components/Layout/index.js";
import { Box } from "./components/Box.js";
import { OutsideLink } from "./components/buttons/OutsideLink.js";

const components = {
  OutsideLink,
  Box,
  h1: (props) => <Box as="h1" {...props} class="heading h1-mdx" />,
  h2: (props) => <Box as="h2" {...props} class="heading h2-mdx" />,
  h3: (props) => <Box as="h3" {...props} class="heading h3-mdx" />,
  h4: (props) => <Box as="h4" {...props} class="heading h4-mdx" />,
  p: (props) => <Box as="p" {...props} class="paragraph-mdx" />,
  ul: (props) => <Box as="ul" {...props} class="ul-mdx" />,
  blockquote: (props) => (
    <Box as="blockquote" {...props} class="blockquote-mdx" />
  ),
  codeblock: (props) => (
    <div
      class="bg-gray-900 p-2"
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
