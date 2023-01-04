import express from "express";
import cors from 'cors';
import mongoose from "mongoose";

import configs from "./configs/config";

const host = configs.host ?? "";
const port = Number(configs.port);

const app = express();

app.use(cors);
app.use(express.json());

mongoose.set("strictQuery", true);

mongoose.connect;

app.listen(port, host, () =>
  console.log(`Server is running at http://${host}:${port}`)
);
