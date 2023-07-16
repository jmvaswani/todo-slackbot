import { checkUserExistence } from "../../db/db";
import { sendMessage } from "../../util/bolt-client";
import { logger } from "../../util/util";
import { handleGreetingMessage } from "./general-messages";
import { GREETINGS, SHOWTODOS } from "../../util/variables";
import { showUserTodos } from "./show-todos";
import { addTodo } from "./add-todo";
import { TODO_REGEX } from "../../util/regex";

export async function handleMessageEvent(event: any) {
  // Check if the message sent is one of the commmonly known greetings
  if (GREETINGS.includes(event.text.toLowerCase())) {
    handleGreetingMessage(event);
  }
  // Check if the user has asked to show todos
  else if (SHOWTODOS.includes(event.text.toLowerCase())) {
    showUserTodos(event);
  }
  // Check if the user has asked to add a todo
  else if (event.text.match(TODO_REGEX)) {
    addTodo(event);
  }
  // Anythin else means you do not understand the message
  else {
    sendMessage(event.channel, "No Comprende");
  }
}
