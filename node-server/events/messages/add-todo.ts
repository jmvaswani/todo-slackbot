import { addUserTodo } from "../../db/db";
import { sendMessage } from "../../util/bolt-client";
import { TODO_REGEX } from "../../util/regex";

const ADDEDSUCCESSFULLYMESSAGE = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `Added the todo successfully`,
    },
  },
];

export async function addTodo(event: any) {
  const match = event.text.match(TODO_REGEX);
  let todo: string = match[1];
  addUserTodo(event.user, todo);
  sendMessage(event.channel, undefined, ADDEDSUCCESSFULLYMESSAGE);
}
