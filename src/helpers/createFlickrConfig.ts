import {AxiosRequestConfig} from "axios";

export const createFlickrConfig = (method: string, params?: {[key: string]: string}): AxiosRequestConfig => ({
  responseType: "text",
  params: {
    ...params,
    "api_key": process.env.FLICKR_API_KEY,
    "user_id": process.env.FLICKR_USER_ID,
    "format": "json",
    "method": method.startsWith("flickr.")
      ? method :
      `flickr.${method}`
  },
  transformResponse: text => text.slice(14, -1)
})