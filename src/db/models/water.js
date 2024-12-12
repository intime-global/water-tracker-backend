import { Schema, model } from 'mongoose';
import { handleSaveError, setupUpdateValidator } from './hooks.js';

const waterNotesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    date: { type: String, required: true },
    waterVolume: {
      type: Number,
      required: true,
      min: [0, 'Amount of water cannot be negative'],
      max: [5000, 'Amount of water cannot exceed 5 liters'],
    },
  },
  { versionKey: false, timestamps: true },
);

waterNotesSchema.post('save', handleSaveError);

waterNotesSchema.pre('findOneAndUpdate', setupUpdateValidator);

waterNotesSchema.post('findOneAndUpdate', handleSaveError);

export const WaterNotesCollection = model('waters', waterNotesSchema);
