import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import request_logger from "morgan";
import { logger, setupLogger } from "./util/util";
import { checkSlackValidity } from "./middleware/verify_slack";
import { connectToDatabase } from "./db/db";

setupLogger();
connectToDatabase();
export var app = express();
app.use(request_logger("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkSlackValidity);

var eventsRouter = require("./routes/events");
var interactivityRouter = require("./routes/interactivitiy");

app.use("/slack/events", eventsRouter);
app.use("/slack/interactivity", interactivityRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send("error");
});

module.exports = app;
