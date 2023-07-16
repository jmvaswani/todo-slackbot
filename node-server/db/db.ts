import { User } from "./../models/User";
import mysql from "mysql";
import { exit } from "process";
import { jsonPrettyPrint, logger } from "../util/util";
import { error } from "console";
import { LocalResponse } from "../models/LocalResponse";
import { Todo } from "../models/Todo";

var connection: mysql.Connection;
export function connectToDatabase() {
  connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT || "3306"),
  });

  try {
    logger.info("Connecting to database..");
    connection.connect((err, result) => {
      if (err != null) {
        logger.error(`Database connection failed, details -> ${err}`);
        exit(1);
      }
      logger.info(
        `In block ${JSON.stringify(err)} ,, ${JSON.stringify(result)}`
      );
    });
    logger.info("Connection successful.");
  } catch (e) {
    logger.error(`Database connection failed due to  ${e}`);
    exit(1);
  }
}

//This function is to convert a callback into a promise ** Very important **
function executeQuery(query: string, params = []): any {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function fetchUsers(
  callback: (error: Error | null, results?: User[]) => void
): void {
  logger.info("Fetching users..");
  let users: User[];
  connection.query("SELECT * from USER", function (error, results) {
    if (error) {
      logger.error(`Failed to fetch users due to   ${error}`);
      callback(error);
    } else {
      logger.info("Fetched users successfully..");
      logger.debug(`Users found -> ${JSON.stringify(results)}`);
      users = results.map((value: any) => {
        return { id: value["ID"], name: value["NAME"] };
      });
      callback(null, users);
    }
  });
}

export function checkUserExistence(
  userID: string,
  callback: (result?: boolean) => void
): void {
  fetchUsers((error, results) => {
    if (!error) {
      logger.debug(JSON.stringify(results));
      if (results?.find((user) => user.id == userID)) {
        callback(true);
      } else {
        callback(false);
      }
    }
    // callback(false);
  });
}

export async function addUser(userID: string, username: string) {
  var results = await executeQuery(
    `INSERT INTO USER VALUES(${connection.escape(userID)},${connection.escape(
      username
    )})`
  );
  logger.info("User could be added successfully");
  logger.debug(JSON.stringify(results));
}

export async function fetchUserTodos(userID: string): Promise<Array<Todo>> {
  var results: Array<any> = await executeQuery(
    `SELECT * from TODO where USERID=${connection.escape(userID)}`
  );
  logger.debug(`TODOS fetched from db -> ${JSON.stringify(results)}`);

  return results.map<Todo>((value) => {
    return {
      id: value["ID"],
      userID: value["USERID"],
      text: value["TEXT"],
      completed: value["COMPLETED"],
    };
  });
}

export async function addUserTodo(
  userID: string,
  todo: string
): Promise<LocalResponse<any>> {
  var results = await executeQuery(
    `INSERT INTO TODO (USERID,TEXT,COMPLETED) VALUES(${connection.escape(
      userID
    )},${connection.escape(todo)},FALSE)`
  );
  if (results["affectedRows"] == 1) {
    return { ok: true, data: "" };
  } else {
    return { ok: false, data: "" };
  }
  logger.debug(`TODO added to db -> ${JSON.stringify(results)}`);
}

export async function completeUserTodo(
  userID: string,
  todoID: number
): Promise<LocalResponse<any>> {
  var results = await executeQuery(
    `UPDATE TODO SET COMPLETED=TRUE WHERE USERID=${connection.escape(
      userID
    )} AND ID=${connection.escape(todoID)}`
  );
  if (results["affectedRows"] == 1) {
    return { ok: true, data: "" };
  } else {
    return { ok: false, data: "" };
  }
}

export async function deleteUserTodo(
  userID: string,
  todoID: number
): Promise<LocalResponse<any>> {
  var results = await executeQuery(
    `DELETE FROM TODO WHERE USERID=${connection.escape(
      userID
    )} AND ID=${connection.escape(todoID)}`
  );
  if (results["affectedRows"] == 1) {
    return { ok: true, data: "" };
  } else {
    return { ok: false, data: "" };
  }
}
