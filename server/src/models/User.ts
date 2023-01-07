import mongoose, { Schema } from "mongoose";
import IUser from '../types/types';

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: Number,
      required: true,
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
export default mongoose.model<IUser>('User', UserSchema);
