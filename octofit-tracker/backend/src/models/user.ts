import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 13, max: 100, required: true },
    heightCm: { type: Number, min: 100, max: 260, required: true },
    weightKg: { type: Number, min: 35, max: 300, required: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
