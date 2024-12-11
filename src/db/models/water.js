import { Schema, model } from 'mongoose';
import { handleSaveError, setupUpdateValidator } from './hooks.js';

const waterNotesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    date: { type: String, required: true },
    waterVolume: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

waterNotesSchema.post('save', handleSaveError);

waterNotesSchema.pre('findOneAndUpdate', setupUpdateValidator);

waterNotesSchema.post('findOneAndUpdate', handleSaveError);

export const WaterNotesCollection = model('waters', waterNotesSchema);
