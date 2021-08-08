import { Handler, HandlerResponse } from "@netlify/functions";
import axios, { AxiosRequestConfig } from "axios";

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

const createFlickrConfig = (
  method: string,
  params?: { [key: string]: string | undefined }
): AxiosRequestConfig => ({
  responseType: "text",
  params: {
    ...params,
    //es-lint-disable-next-line
    api_key: process.env.FLICKR_API_KEY,
    //es-lint-disable-next-line
    user_id: process.env.FLICKR_USER_ID,
    format: "json",
    method: method.startsWith("flickr.") ? method : `flickr.${method}`
  },
  transformResponse: text => text.slice(14, -1)
});

const createErrorResponse = (
  statusCode: number,
  message?: string
): HandlerResponse => ({
  statusCode,
  body: JSON.stringify({ message: message ?? "unknown error" })
});

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
