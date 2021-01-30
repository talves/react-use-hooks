import { h } from "preact";
import { Helmet } from "react-helmet";

export default ({
  pageUrl = null,
  type = null,
  title = null,
  description = null,
  image = null,
  appID = null,
}) => <Helmet>{appID && <meta property="fb:app_id" content={appID} />}</Helmet>;
