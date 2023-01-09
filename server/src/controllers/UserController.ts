import { NextFunction, Request, Response } from "express";
// import { isValidObjectId } from "mongoose";
import User from "../models/User";
import * as bcrypt from "bcryptjs";
import signJWT from "../functions/signJWT";

const UserController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      User.find({ email })
        .exec()
        .then((users) => {
          if (users.length !== 1) {
            return res.status(401).json({
              message: "Você não possui permissão para esta ação",
            });
          }

          bcrypt.compare(password, users[0].password, (error, result) => {
            if (error) {
              console.log("error", error.message, error);

              return res.status(401).json({
                message: "Você não possui permissão para esta ação",
              });
            } else if (result) {
              signJWT(users[0], (_error, token) => {
                if (_error) {
                  console.log("Unable to sign in token: ", _error);

                  return res.status(401).json({
                    message: "Você não possui permissão para esta ação",
                    error: _error,
                  });
                } else if (token) {
                  return res.status(200).json({
                    message: "Auth Sucessfull",
                    token,
                    user: users[0],
                  });
                }
              });
            }
          });
        })
        .catch((error: any) => {
          return res.status(500).json({
            message: error.message,
            error,
          });
        });
    } catch (err: any) {
      const message = err.message
        ? err.message
        : "Falha no login, tente novamente";

      return res.status(400).json({ message });
    }
  },
};

export default UserController;
