import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'ride', 'swim', 'strength', 'mobility', 'hiit'],
      required: true
    },
    durationMin: { type: Number, min: 1, required: true },
    caloriesBurned: { type: Number, min: 0, required: true },
    distanceKm: { type: Number, min: 0 },
    performedAt: { type: Date, required: true }
  },
  { timestamps: true }
);

const Activity = model('Activity', activitySchema);

export default Activity;
