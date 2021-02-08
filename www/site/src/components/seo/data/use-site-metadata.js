import { h } from "preact";
import { useEffect, useState } from "preact/compat";
import { useSiteData } from "../../../site-data-provider.js";

export const useSiteMetadata = () => {
  const siteData = useSiteData();
  const [data, setData] = useState(
    siteData ? siteData["site-metadata"] || {} : {}
  );

  useEffect(() => {
    if (!siteData) return;
    setData(siteData["site-metadata"] || {});
  }, [siteData]);
  // title;
  // description;
  // author;
  // organization;
  // facebookAppID;
  // image;
  // owner;
  // titleTemplate;
  // twitterUsername;
  // twitterCardType;
  // url;
  return data;
};
