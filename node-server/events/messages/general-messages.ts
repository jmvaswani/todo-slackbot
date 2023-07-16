import { getUserName, sendMessage } from "../../util/bolt-client";

export async function handleGreetingMessage(event: any) {
  let { ok, data: username } = await getUserName(event.user);
  if (!ok) {
    await sendMessage(
      event.channel,
      "Hey!, something seems to be wrong with your name, please contact the admin"
    );
  } else {
    await sendMessage(event.channel, undefined, [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Howdy \`${username}\`! \n I am a todo bot, you can start off by asking me to  \`show todos\` , or use \`help\` to get a more detailed help message.`,
        },
      },
    ]);
  }
}
