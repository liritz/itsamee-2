import { Handler, HandlerResponse } from "@netlify/functions";
import axios from "axios";
import { createFlickrConfig } from "@/backend/createFlickrConfig";
import { createErrorResponse } from "@/backend/createErrorResponse";

if (
  !(
    process.env.FLICKR_URL &&
    process.env.FLICKR_API_KEY &&
    process.env.FLICKR_USER_ID
  )
) {
  throw new Error("Environment not properly set up!");
}
const flickrURL = process.env.FLICKR_URL;

const cache: { [key: string]: HandlerResponse } = {};

export const handler: Handler = async ({ queryStringParameters }, context) => {
  if (!context.clientContext) {
    return createErrorResponse(500, "No client context!");
  }

  if (!queryStringParameters) {
    return createErrorResponse(400, "No query given!");
  }

  if (!queryStringParameters.method) {
    return createErrorResponse(400, "No method given!");
  }

  const { method, ...queryParams } = queryStringParameters;

  const callType = `${method}-${queryParams.page ?? 1}-${queryParams.per_page ??
    500}`;

  if (!cache[callType]) {
    const { data, status } = await axios.get(
      flickrURL,
      createFlickrConfig(method, queryParams)
    );
    cache[callType] = {
      statusCode: status,
      body: data
    };
  }

  return cache[callType];
};
