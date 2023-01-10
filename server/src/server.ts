import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import configs from "./configs/config";
import config from "./configs/database";
import route from "./routes";

const host = configs.host ?? "";
const port = Number(configs.port || 8080);

const uri = config.uri ?? "";
const options = config.options;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", route);

mongoose.set("strictQuery", true);
mongoose
  .connect(uri, options)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Unable to connect", err));

app.listen(port, host, () =>
  console.log(`Server is running at http://${host}:${port}`)
);
