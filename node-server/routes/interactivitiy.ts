import express, { Request, Response, NextFunction } from "express";
var router = express.Router();
import { jsonPrettyPrint, logger } from "../util/util";
import axios from "axios";
import { COMPLETE_TODO_REGEX, DELETE_TODO_REGEX } from "../util/regex";
import { completeUserTodo, deleteUserTodo, fetchUserTodos } from "../db/db";
import { Todo } from "../models/Todo";
import {
  NOTODOMESSAGE,
  makeTodosMessage,
} from "../events/messages/message-templates";

router.post(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    let payload = JSON.parse(req.body.payload);
    logger.debug(
      `Interactivity request recieved -> ${jsonPrettyPrint(payload)}`
    );
    res.send();

    let userID: string = payload.user.id;
    let url = payload["response_url"];
    if (payload["actions"][0]["value"].match(COMPLETE_TODO_REGEX)) {
      let matches = payload["actions"][0]["value"].match(COMPLETE_TODO_REGEX);
      let results = await completeUserTodo(userID, parseInt(matches[1]));
      if (results.ok) {
        let todos: Array<Todo> = await fetchUserTodos(userID);
        let todo_message = makeTodosMessage(todos);
        axios.post(url, {
          replace_original: "true",
          blocks: todo_message,
        });
      } else {
        axios.post(url, {
          replace_original: "true",
          message: "Something went wrong",
        });
      }
    } else if (payload["actions"][0]["value"].match(DELETE_TODO_REGEX)) {
      let matches = payload["actions"][0]["value"].match(DELETE_TODO_REGEX);
      let results = await deleteUserTodo(userID, parseInt(matches[1]));
      if (results.ok) {
        let todos: Array<Todo> = await fetchUserTodos(userID);
        let todo_message;
        if (todos.length == 0) {
          todo_message = NOTODOMESSAGE;
        } else {
          todo_message = makeTodosMessage(todos);
        }

        axios.post(url, {
          replace_original: "true",
          blocks: todo_message,
        });
      } else {
        axios.post(url, {
          replace_original: "true",
          message: "Something went wrong",
        });
      }
    } else {
      logger.error("Something weird happened here, unknown action triggered");
    }
  }
);

module.exports = router;
