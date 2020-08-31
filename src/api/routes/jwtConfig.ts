import jwt from "express-jwt";
import { TOKEN_SECRET } from "../../config";

import express from "express";

export const JWT_CONFIG: jwt.Options = {
  secret: TOKEN_SECRET,
  algorithms: ["HS256"],
};

export function handle_JWT_Unauthorized(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: Function
) {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err);
  if (err.name == "UnauthorizedError") {
    res.status(401).send({
      message: "Unauthorized!",
    });
  } else {
    next(err);
  }
}
