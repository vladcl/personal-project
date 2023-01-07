import config from "../configs/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const NAMESPACE = "Auth";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log(NAMESPACE, "validating token");

  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, config.security.salt!, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error,
        });
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Você não possui permissão para esta ação",
    });
  }
};

export default extractJWT;
