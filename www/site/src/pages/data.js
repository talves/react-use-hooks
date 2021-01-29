import { h } from "preact";
import { useSiteData } from "../site-data-provider.js";

export default (props) => {
  const data = useSiteData();
  return (
    <div>
      <div as="div" class="bg-header">
        Site Data JSON
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
