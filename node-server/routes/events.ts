import express, { Request, Response, NextFunction } from "express";
var router = express.Router();
import { jsonPrettyPrint, logger } from "../util/util";
import { handleMessageEvent } from "../events/messages/message";

router.post(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    let { event } = req.body;
    if (event.type == "message") {
      // Only consider the message if the event was triggered by a user, and the user was not the BOT_USER
      if (event.user && event.user != process.env.SLACK_BOT_USER_ID) {
        logger.debug(`New message event received ${jsonPrettyPrint(req.body)}`);
        handleMessageEvent(event);
      }
      res.send();
    } else {
      logger.warn(`New type of event?? -> ${event}`);
      res.send();
    }
  }
);

module.exports = router;
