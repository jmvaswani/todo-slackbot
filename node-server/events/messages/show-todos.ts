import { todo } from "node:test";
import { addUser, checkUserExistence, fetchUserTodos } from "../../db/db";
import { getUserName, sendMessage } from "../../util/bolt-client";
import {
  NOTODOMESSAGE,
  ADD_NEW_USER_MESSAGE,
  SOMETHING_WENT_WRONG_MESSAGE,
  USERADDED_SUCCESSFULLY_MESSAGE,
  makeTodosMessage,
} from "./message-templates";
import { Todo } from "../../models/Todo";

export async function showUserTodos(event: any) {
  checkUserExistence(event.user, async (userExistsInDatabase) => {
    if (userExistsInDatabase) {
      let todos: Array<Todo> = await fetchUserTodos(event.user);
      if (todos.length == 0) {
        sendMessage(event.channel, undefined, NOTODOMESSAGE);
      } else {
        let todo_message = makeTodosMessage(todos);
        await sendMessage(event.channel, undefined, todo_message);
      }
    } else {
      sendMessage(event.channel, undefined, ADD_NEW_USER_MESSAGE);
      let { ok, data: username } = await getUserName(event.user);
      if (!ok) {
        sendMessage(event.channel, undefined, SOMETHING_WENT_WRONG_MESSAGE);
      } else {
        await addUser(event.user, username);
        sendMessage(event.channel, undefined, USERADDED_SUCCESSFULLY_MESSAGE);
      }
    }
  });
}
