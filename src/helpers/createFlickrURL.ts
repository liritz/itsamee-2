/*
 * This helper function creates a URL Object for a given flickr-method
 * (with or without the prefixed 'flickr.'). Additional query-params
 * can easily be added to the base url by using '.searchParams.append()'
 */

export const createFlickrURL = (method: string): string => {
  if (!process.env.FLICKR_URL) {
    throw new Error("FLICKR_URL undefined!");
  }
  if (!process.env.FLICKR_API_KEY) {
    throw new Error("FLICKR_API_KEY undefined!");
  }
  if (!process.env.FLICKR_USER_ID) {
    throw new Error("FLICKR_USER_ID undefined!");
  }
  const url = new URL(process.env.FLICKR_URL);
  url.searchParams.append("api_key", process.env.FLICKR_API_KEY);
  url.searchParams.append("user_id", process.env.FLICKR_USER_ID);
  url.searchParams.append(
    "method",
    method.startsWith("flickr.") ? method : `flickr.${method}`
  );
  url.searchParams.append("format", "json");

  return url.toString();
};
