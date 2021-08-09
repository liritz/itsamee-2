import { Handler } from "@netlify/functions";
import { createErrorResponse } from "@/backend/createErrorResponse";
import { getTree } from "@/backend/getTree";
import { createContent } from "@/backend/createContent";

if (
  !(
    process.env.FLICKR_URL &&
    process.env.FLICKR_API_KEY &&
    process.env.FLICKR_USER_ID
  )
) {
  throw new Error("Environment not properly set up!");
}

let body: string | null = null;
const statusCode = 200;

export const handler: Handler = async (event, context) => {
  if (!context.clientContext) {
    return createErrorResponse(500, "No client context!");
  }

  if (!body) {
    const tree = await getTree();
    const content = await createContent(tree);
    body = JSON.stringify(content);
  }

  return { statusCode, body };
};
