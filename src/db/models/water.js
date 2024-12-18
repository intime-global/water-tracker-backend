import { Schema, model } from 'mongoose';
import { handleSaveError, setupUpdateValidator } from './hooks.js';

const waterNotesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    year: { type: String, required: true },
    month: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    waterRate: {
      type: Number,
      required: true,
      min: [0, 'Amount of water cannot be negative'],
      max: [15000, 'Amount of water cannot exceed 15 liters'],
    },
    waterVolume: {
      type: Number,
      required: true,
      min: [0, 'Amount of water cannot be negative'],
      max: [5000, 'Amount of water cannot exceed 5 liters'],
    },
  },
  { versionKey: false, timestamps: true },
);

// waterNotesSchema.index({ userId: 1, month: 1, year: 1 });

waterNotesSchema.post('save', handleSaveError);

waterNotesSchema.pre('findOneAndUpdate', setupUpdateValidator);

waterNotesSchema.post('findOneAndUpdate', handleSaveError);

export const WaterNotesCollection = model('waters', waterNotesSchema);
