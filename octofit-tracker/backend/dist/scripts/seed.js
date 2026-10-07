import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Mona Octocat',
                email: 'mona@example.com',
                profile: { age: 29, fitnessLevel: 'intermediate', goals: ['Improve endurance', 'Run a half marathon'] },
            },
            {
                name: 'Scout Coder',
                email: 'scout@example.com',
                profile: { age: 34, fitnessLevel: 'beginner', goals: ['Build strength', 'Exercise consistently'] },
            },
            {
                name: 'Pixel Runner',
                email: 'pixel@example.com',
                profile: { age: 26, fitnessLevel: 'advanced', goals: ['Increase speed', 'Complete a trail race'] },
            },
        ]);
        const teams = await Team.insertMany([
            { name: 'Octo Runners', motto: 'Every mile makes a difference', members: [users[0]._id, users[2]._id] },
            { name: 'Code Crushers', motto: 'Strong habits, stronger community', members: [users[1]._id] },
        ]);
        await Activity.insertMany([
            {
                user: users[0]._id,
                type: 'run',
                durationMinutes: 42,
                distanceKm: 6.4,
                calories: 480,
                completedAt: new Date('2026-10-05T07:30:00Z'),
            },
            {
                user: users[1]._id,
                type: 'strength',
                durationMinutes: 35,
                calories: 260,
                completedAt: new Date('2026-10-04T18:00:00Z'),
            },
            {
                user: users[2]._id,
                type: 'cycle',
                durationMinutes: 58,
                distanceKm: 22.1,
                calories: 620,
                completedAt: new Date('2026-10-06T06:45:00Z'),
            },
        ]);
        await Leaderboard.insertMany([
            { user: users[0]._id, points: 840, rank: 2, period: 'weekly' },
            { user: users[1]._id, points: 560, rank: 3, period: 'weekly' },
            { user: users[2]._id, points: 920, rank: 1, period: 'weekly' },
        ]);
        await Workout.insertMany([
            {
                name: 'Endurance Builder',
                description: 'A steady cardio session to improve aerobic capacity.',
                difficulty: 'intermediate',
                durationMinutes: 40,
                exercises: [
                    { name: 'Warm-up jog', sets: 1, repetitions: 10 },
                    { name: 'Tempo run', sets: 3, repetitions: 8 },
                    { name: 'Cool-down walk', sets: 1, repetitions: 5 },
                ],
            },
            {
                name: 'Desk Break Strength',
                description: 'A practical full-body routine for a busy workday.',
                difficulty: 'beginner',
                durationMinutes: 25,
                exercises: [
                    { name: 'Bodyweight squat', sets: 3, repetitions: 12 },
                    { name: 'Incline push-up', sets: 3, repetitions: 10 },
                    { name: 'Plank', sets: 3, repetitions: 30 },
                ],
            },
        ]);
        console.log(`Database seeding complete: ${users.length} users and ${teams.length} teams created`);
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
}
seedDatabase();
