import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, min: 0, required: true },
    rank: { type: Number, min: 1, required: true },
    weekStart: { type: Date, required: true }
  },
  { timestamps: true }
);

leaderboardSchema.index({ weekStart: 1, rank: 1 }, { unique: true });

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
