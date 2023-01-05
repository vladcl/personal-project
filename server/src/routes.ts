import express from "express";
import UserController from './controllers/UserController'

const route = express.Router();

route.post("/login", UserController.login);

export default route;