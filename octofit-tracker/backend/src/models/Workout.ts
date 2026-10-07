import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: {
      type: [
        {
          name: { type: String, required: true },
          sets: { type: Number, required: true, min: 1 },
          repetitions: { type: Number, required: true, min: 1 },
        },
      ],
      required: true,
    },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
