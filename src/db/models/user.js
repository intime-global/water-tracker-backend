import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../constants/user.js';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: emailRegexp, requirerd: true, unique: true },
    password: { type: String, requirerd: true },
    gender: { type: String, required: true },
    daylyNorm: { type: String, required: true },
    photo: { type: String, required: true },
    // verify: { type: Boolean, default: false, required: true },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const sortByList = ["name", "email", "gender"];

export const UsersCollection = model('users', usersSchema);
