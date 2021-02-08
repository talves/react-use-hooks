import { h, Fragment } from "preact";
import { Helmet } from "react-helmet";
import Twitter from "./twitter.js";
import Facebook from "./facebook.js";
import SchemaOrg from "./schema-org.js";

/* 
https://tony.alves.dev/.netlify/functions/og-create/?ogpath=https://tony.alves.dev/og/&title=Read%20about%20the%20tech%20I%27m%20working%20on!&tag=site&tag=https://tony.alves.dev&name=Tony%20Alves&width=1024&height=542&mode=dark
*/

const SEO = ({ pageMeta = {}, siteMeta = {} }) => {
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
  const seo = {
    title: title || siteMeta.title,
    description: description || siteMeta.description,
    image: `${siteMeta.url}${image || siteMeta.image}`,
    url: `${siteMeta.url}${pathname || "/"}`,
    author: author || siteMeta.author,
    organization: organization || siteMeta.organization || siteMeta.owner,
  };

  return (
    <>
      <Helmet title={seo.title} titleTemplate={siteMeta.titleTemplate}>
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
      <Facebook appID={siteMeta.facebookAppID} />
      <Twitter
        username={siteMeta.twitterUsername}
        title={seo.title}
        description={seo.description}
        cardType={siteMeta.twitterCardType}
        image={seo.image}
      />
      <SchemaOrg
        isArticle={isArticle}
        url={seo.url}
        title={seo.title}
        image={seo.image}
        description={seo.description}
        datePublished={datePublished}
        siteUrl={siteMeta.url}
        author={seo.author}
        organization={seo.organization}
        defaultTitle={seo.title}
      />
    </>
  );
};

export default SEO;
