import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../constants/users.js';

import { handleSaveError, setupUpdateValidator } from './hooks.js';

const usersSchema = new Schema(
  {
   name: {
      type: String,
      default: 'Anonymous',
    },
    email: { type: String, match: emailRegexp, requirerd: true, unique: true },
    password: { type: String, requirerd: true },
    waterRate: { type: String, default: '1500' },
    gender: { type: String, enum: ['woman', 'man'], default: 'woman' },
    daylyNorm: { type: String },
    photo: { type: String },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

usersSchema.post('save', handleSaveError);

usersSchema.pre('findOneAndUpdate', setupUpdateValidator);

usersSchema.post('findOneAndUpdate', handleSaveError);


export const UsersCollection = model('users', usersSchema);
