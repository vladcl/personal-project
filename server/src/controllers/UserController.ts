import { NextFunction, Request, Response } from "express";
import User  from "../models/User";
import * as bcrypt from "bcryptjs";
import signJWT from "../functions/signJWT";
import { isValidObjectId } from "mongoose";

const UserController = {
  async index(req: Request, res: Response) {
    try {
      const { search, ...filter } = req.query;

      const searchRegex = new RegExp(String(search), "i");

      const users = await User.paginate(
        { name: searchRegex },
        filter
      );

      return res.status(200).json(users);
    } catch (err: any) {
      const message = err.message
        ? err.message
        : "Não foi possível listar os departamentos";

      return res.status(400).json({ message });
    }
  },
  async add(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log(data);

      await User.create(data);

      return res
        .status(200)
        .json({ message: "Usuário cadastrado com sucesso" });
    } catch (err: any) {
      const message = err.message
        ? err.message
        : "Não foi possível cadastrar o usuário";

      return res.status(400).json({ message });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      User.find({ username })
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
  async view(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id))
        return res
          .status(400)
          .json({ message: "O código de identificação é inválido" });

      const user = await User.findById(id);

      if (!user)
        return res
          .status(400)
          .json({ message: "O usuário não foi encontrado" });

      return res.status(200).json(user);
    } catch (err: any) {
      const message = err.message
        ? err.message
        : "Não foi possível visualizar o usuário";

      return res.status(400).json({ message });
    }
  },
  async edit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!isValidObjectId(id))
        return res
          .status(400)
          .json({ message: "O código de identificação é inválido" });

      if (!data.password) delete data.password;

      const user = await User.findOneAndUpdate({ _id: id }, data);

      if (!user)
        return res
          .status(400)
          .json({ message: "O usuário não foi encontrado" });

      return res
        .status(200)
        .json({ message: "Usuário modificado com sucesso" });
    } catch (err: any) {
      const message = err.message
        ? err.message
        : "Não foi possível modificar o usuário";

      return res.status(400).json({ message });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id))
        return res
          .status(400)
          .json({ message: "O código de identificação é inválido" });

      const user = await User.findOneAndDelete({ _id: id });

      if (!user)
        return res
          .status(400)
          .json({ message: "O usuário não foi encontrado" });

      return res.status(200).json({ message: "Usuário removido com sucesso" });
    } catch (err: any) {
      const message = err.message
        ? err.message
        : "Não foi possível remover o usuário";

      return res.status(400).json({ message });
    }
  },
};

export default UserController;
