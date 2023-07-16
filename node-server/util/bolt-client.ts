// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
import { WebClient, LogLevel, ChatMeMessageArguments } from "@slack/web-api";
import { logger } from "./util";
import { LocalResponse } from "../models/LocalResponse";

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.SLACK_OAUTH_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.INFO,
});

export async function sendMessage(
  channelId: string,
  message?: string,
  blocks?: any
) {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await client.chat.postMessage({
      // The token you used to initialize your app
      token: process.env.SLACK_OAUTH_TOKEN,
      channel: channelId,
      text: message,
      blocks: blocks,
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserName(
  userID: string
): Promise<LocalResponse<string>> {
  const result = await client.users.profile.get({
    token: process.env.SLACK_OAUTH_TOKEN,
    user: userID,
  });
  if (
    !result.ok ||
    result.profile == undefined ||
    result.profile.real_name == undefined
  ) {
    logger.error(`Failed to get user profile, error -> ${result}`);
    return { ok: false, data: "" };
  } else {
    return { ok: true, data: result.profile.real_name };
  }
}
