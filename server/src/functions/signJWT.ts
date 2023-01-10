import config from "../configs/config";
import IUser from "../types/types";
import jwt from "jsonwebtoken";

const getTimeStamp = (): string => {
    return new Date().toISOString();
};
const myError = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
    } else {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
    }
};

const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  let timeSinceEpoch = new Date().getTime();
  let expirationTime =
    timeSinceEpoch + Number(config.security.expiresIn) * 100000;
  let expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  console.log("testing", `Attempting to sign token for ${user._id}`);

  try {
    jwt.sign(
      {
        username: user.username,
      },
      config.security.salt!,
      {
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error: any) {
   callback(error, null);
  }
};

export default signJWT;
