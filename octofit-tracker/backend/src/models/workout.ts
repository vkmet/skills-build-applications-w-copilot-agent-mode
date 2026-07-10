import { Schema, model } from 'mongoose';

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sets: { type: Number, min: 1, required: true },
    reps: { type: String, required: true, trim: true },
    restSec: { type: Number, min: 0, required: true }
  },
  { _id: false }
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['strength', 'cardio', 'hybrid', 'recovery'],
      required: true
    },
    targetLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    durationMin: { type: Number, min: 10, required: true },
    exercises: { type: [exerciseSchema], default: [] }
  },
  { timestamps: true }
);

const Workout = model('Workout', workoutSchema);

export default Workout;
