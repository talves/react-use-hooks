import { h, Fragment } from "preact";
import { Helmet } from "react-helmet";
import Twitter from "./twitter.js";
import Facebook from "./facebook.js";
import SchemaOrg from "./schema-org.js";
import { useSiteMetadata } from "./data/use-site-metadata.js";

/* 
https://tony.alves.dev/.netlify/functions/og-create/?ogpath=https://tony.alves.dev/og/&title=Read%20about%20the%20tech%20I%27m%20working%20on!&tag=site&tag=https://tony.alves.dev&name=Tony%20Alves&width=1024&height=542&mode=dark
*/

const SEO = ({ pageMeta = {} }) => {
  const {
    title = null,
    description = null,
    image = null,
    pathname = null,
    datePublished,
    author = null,
    organization = null,
    isArticle = false,
  } = pageMeta;

  const {
    title: defaultTitle,
    titleTemplate,
    description: defaultDescription,
    url: siteUrl,
    image: defaultImage,
    owner,
    author: defaultAuthor,
    organization: defaultOrganization,
    twitterUsername,
    twitterCardType,
    facebookAppID,
  } = useSiteMetadata();
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname || "/"}`,
    author: author || defaultAuthor,
    organization: organization || defaultOrganization || owner,
  };
  // console.log('pageMeta', pageMeta, seo);

  return (
    <>
      <Helmet title={seo.title} titleTemplate={titleTemplate}>
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />
        <link rel="canonical" href={seo.url} />

        {/* Open-Graph */}
        {seo.url && <meta property="og:url" content={seo.url} />}
        {seo.title && <meta property="og:title" content={seo.title} />}
        {seo.description && (
          <meta property="og:description" content={seo.description} />
        )}
        {seo.image && <meta property="og:image" content={seo.image} />}

        {/* Is this an Article */}
        {isArticle ? <meta property="og:type" content="article" /> : null}
      </Helmet>
      <Facebook appID={facebookAppID} />
      <Twitter
        username={twitterUsername}
        title={seo.title}
        description={seo.description}
        cardType={twitterCardType}
        image={seo.image}
      />
      <SchemaOrg
        isArticle={isArticle}
        url={seo.url}
        title={seo.title}
        image={seo.image}
        description={seo.description}
        datePublished={datePublished}
        siteUrl={siteUrl}
        author={seo.author}
        organization={seo.organization}
        defaultTitle={seo.title}
      />
    </>
  );
};

export default SEO;
