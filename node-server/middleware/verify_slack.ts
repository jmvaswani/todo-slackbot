import express, { Request, Response, NextFunction } from "express";
import { jsonPrettyPrint, logger } from "../util/util";
import { exit } from "process";
if (process.env.SLACK_API_TOKEN) {
  var SLACK_API_TOKEN = process.env.SLACK_API_TOKEN;
} else {
  console.log(
    "SLACK APP SIGNING SECRET MISSING, PASS IN WITH ENV VARIABLE 'SLACK_API_TOKEN'"
  );
  exit(1);
}

// Middleware to check validity of slack request. Currenlty uses older token method as some issues were found while implementing new signature method
export function checkSlackValidity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let payload;
  if (req.url == "/slack/interactivity") {
    payload = JSON.parse(req.body.payload);
  } else {
    payload = req.body;
  }
  if (payload["token"] && payload["token"] == SLACK_API_TOKEN) {
    next();
  } else {
    res.status(401).send("Who u?");
  }
}
