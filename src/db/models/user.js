import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../constants/users.js';

import { handleSaveError, setupUpdateValidator } from './hooks.js';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
    },
    email: { type: String, match: emailRegexp, required: true, unique: true },
    password: { type: String, required: true },
    waterRate: {
      type: Number,
      default: 2000,
      min: [0, 'Amount of water cannot be negative'],
      max: [15000, 'Amount of water cannot exceed 15 liters'],
    },
    gender: { type: String, enum: ['male', 'female'], default: 'female' },
    photo: {
      type: String,
      default: '',
    },
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

export const UsersCollection = model('user', usersSchema);
