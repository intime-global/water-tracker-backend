import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../constants/user.js';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: emailRegexp, requirerd: true, unique: true },
    password: { type: String, requirerd: true },
    verify: { type: Boolean, default: false, required: true },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
