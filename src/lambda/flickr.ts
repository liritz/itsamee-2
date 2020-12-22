import { APIGatewayEvent, Context, Handler } from "aws-lambda";
import axios, { AxiosRequestConfig } from "axios";

type ItsameeResponse = {
  statusCode: number;
  statusText?: string;
  body: string;
};

const createFlickrConfig = (
  method: string,
  params?: { [key: string]: string }
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
): ItsameeResponse => ({
  statusCode,
  body: JSON.stringify({ message: message ?? "unknown error" })
});

if (!process.env.FLICKR_URL) {
  throw new Error("FLICKR_URL undefined!");
}
const url = process.env.FLICKR_URL;

const cache: { [key: string]: ItsameeResponse } = {};

export const handler: Handler = async (
  { queryStringParameters }: APIGatewayEvent,
  context: Context
): Promise<ItsameeResponse> => {
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
    const { data, statusText, status } = await axios.get(
      url,
      createFlickrConfig(method, queryParams)
    );
    cache[callType] = {
      statusCode: status,
      statusText,
      body: data
    };
  }

  return cache[callType];
};
