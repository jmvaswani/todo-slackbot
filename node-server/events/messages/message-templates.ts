import { Todo } from "../../models/Todo";

export const ADD_NEW_USER_MESSAGE = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `You seem to be new here, I will quickly add you to my database.`,
    },
  },
];
export const SOMETHING_WENT_WRONG_MESSAGE = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `Oops, something went wrong, please contact the admin :cry:`,
    },
  },
];
export const USERADDED_SUCCESSFULLY_MESSAGE = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `You were added successfully to the database :smiley:`,
    },
  },
];
export const USER_IN_DB_MESSAGE = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `You exist in the database :smiley:`,
    },
  },
];
export const NOTODOMESSAGE = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `You do not seem to have any todos :face_with_raised_eyebrow: \n You can add one by sending me \`add todo <todo>\``,
    },
  },
];
export function makeTodosMessage(todos: Array<Todo>) {
  let sections: Array<any> = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `You currently have *${todos.length}* todo(s) added. They are listed below`,
      },
    },
    {
      type: "divider",
    },
  ];
  let counter = 1;
  todos.forEach((todo) => {
    sections.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${counter}) ${
          todo.completed ? todo.text : "*" + todo.text + "*"
        }`,
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: todo.completed ? "Delete todo" : "Mark as completed",
          emoji: true,
        },
        value: todo.completed
          ? `delete-todo-${todo.id}`
          : `complete-todo-${todo.id}`,
        action_id: "button-action",
      },
    });
    counter += 1;
  });
  return sections;
}
