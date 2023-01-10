import express from "express";
import UserController from './controllers/UserController'

const route = express.Router();

route.post("/login", UserController.login);
route.get(
    "/user",
    UserController.index
);
route.get("/user", UserController.view);
route.post("/user", UserController.add);
route.patch("/user/:id", UserController.edit);
route.delete("/user/:id", UserController.delete);

export default route;