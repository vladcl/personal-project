import mongoose, { Schema } from "mongoose";
import IUser from '../types/types';
import bcrypt from 'bcryptjs';

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('insertMany', async function(next, docs) {
  if (docs.length > 0) {
      const users = docs.map(async (user: any) => {
          user.password = await bcrypt.hash(user.password, 10);

          return user;
      });
      docs = await Promise.all(users);

      next();
  }
  next(new Error('Nenhum usuário enviado'));
});


export default mongoose.model<IUser>('User', UserSchema);
