import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, enum: ['weekly', 'monthly', 'all-time'] },
}, { timestamps: true });
export default model('Leaderboard', leaderboardSchema);
