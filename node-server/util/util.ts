import winstonlogger from "winston";

export var logger: winstonlogger.Logger;

export function setupLogger() {
  logger = winstonlogger.createLogger({
    level: process.env.LOGLEVEL,
    format: winstonlogger.format.combine(
      winstonlogger.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winstonlogger.format.colorize(),
      winstonlogger.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
    transports: [
      // Define the transports (output targets) for logging
      new winstonlogger.transports.Console(), // Output logs to the console
      // new winston.transports.File({ filename: 'logs.log' }) // Output logs to a fil
    ],
  });
}

export function jsonPrettyPrint(value: any) {
  return JSON.stringify(value, null, 2);
}
