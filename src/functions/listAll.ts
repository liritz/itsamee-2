import { APIGatewayEvent, Context, Handler } from "aws-lambda";

// Have to use ".." instead of "@"-imports for the netlify-lambda build to work

import axios from "axios";
import { createFlickrConfig } from "../helpers/createFlickrConfig";

type ItsameeResponse = {
  statusCode: number,
  statusText?: "ok",
  body: string
}


if (!process.env.FLICKR_URL) {
  throw new Error("FLICKR_URL undefined!");
}
const url = process.env.FLICKR_URL;

let cache: ItsameeResponse | null = null;

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<ItsameeResponse> => {
  if (!context.clientContext) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: "No client context!"
      })
    };
  }

  if (!cache) {
    const {data, statusText, status} = await axios.get(
      url,
      createFlickrConfig(
        "photosets.getList",
        {"primary_photo_extras": "date_taken,url_sq,url_t,url_s,url_m,url_o"}
      ));
    console.log("loaded Data!");
    cache = {
      statusCode: status,
      statusText,
      body: data
    };
  }
  return cache;



  
  // axios.get(url, {
  //     params: {
  //       "primary_photo_extras": "date_taken,url_sq,url_t,url_s,url_m,url_o"
  //     }
  //   })


    // if (!response.ok) {
    //   return {
    //     statusCode: response.status,
    //     body: response.statusText
    //   };
    // }

    // /* We take the JSONP from flickr and remove the wrapper-function before passing it on */
    // const cleanedDataString: string = await cleanFlickrResponse(response);
    //
    // return {
    //   statusCode: response.status,
    //   body: cleanedDataString
    // };
  // } catch (e) {
  //   console.error(e);
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({
  //       msg: e.message
  //     })
  //   };
  // }
};
