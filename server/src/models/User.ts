import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import UserSchema from '../schemas/UserSchema';
import config from "../configs/config";

const security = {
    expiresIn: config.security.expiresIn,
    salt: config.security.salt,
};

UserSchema.pre('findOneAndUpdate', function(next) {
    this.findByIdAndUpdate({}, {updatedAt: new Date()});

    next();
});

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password, 10);
});





