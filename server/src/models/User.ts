import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import IUser from "../types/types";
import bcrypt from "bcryptjs";

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("insertMany", async function (next, docs) {
  if (docs.length > 0) {
    const users = [...docs].map(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);

      return user;
    });
    docs = await Promise.all(users);

    next();
  }
  next(new Error("Nenhum usuário enviado"));
});

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model<IUser>("User", UserSchema);

User.createIndexes();

export default User;
