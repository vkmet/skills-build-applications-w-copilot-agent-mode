import mongoose from 'mongoose';

import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
      {
        fullName: 'Mia Chen',
        email: 'mia.chen@octofit.local',
        age: 29,
        heightCm: 168,
        weightKg: 61,
        fitnessLevel: 'advanced'
      },
      {
        fullName: 'Noah Martinez',
        email: 'noah.martinez@octofit.local',
        age: 34,
        heightCm: 182,
        weightKg: 79,
        fitnessLevel: 'intermediate'
      },
      {
        fullName: 'Ava Singh',
        email: 'ava.singh@octofit.local',
        age: 26,
        heightCm: 171,
        weightKg: 65,
        fitnessLevel: 'advanced'
      },
      {
        fullName: 'Liam Johnson',
        email: 'liam.johnson@octofit.local',
        age: 31,
        heightCm: 176,
        weightKg: 73,
        fitnessLevel: 'beginner'
      }
    ]);

    const [mia, noah, ava, liam] = users;

    const teams = await Team.insertMany([
      {
        name: 'Downtown Dashers',
        city: 'Seattle',
        coach: 'Coach Riley Brooks',
        members: [mia._id, noah._id]
      },
      {
        name: 'Harbor Hustlers',
        city: 'Portland',
        coach: 'Coach Jordan Lee',
        members: [ava._id, liam._id]
      }
    ]);

    await User.updateOne({ _id: mia._id }, { team: teams[0]._id });
    await User.updateOne({ _id: noah._id }, { team: teams[0]._id });
    await User.updateOne({ _id: ava._id }, { team: teams[1]._id });
    await User.updateOne({ _id: liam._id }, { team: teams[1]._id });

    await Activity.insertMany([
      {
        user: mia._id,
        type: 'run',
        durationMin: 42,
        caloriesBurned: 510,
        distanceKm: 8.4,
        performedAt: new Date('2026-07-05T06:30:00Z')
      },
      {
        user: noah._id,
        type: 'strength',
        durationMin: 50,
        caloriesBurned: 430,
        performedAt: new Date('2026-07-06T18:10:00Z')
      },
      {
        user: ava._id,
        type: 'hiit',
        durationMin: 30,
        caloriesBurned: 390,
        performedAt: new Date('2026-07-07T07:15:00Z')
      },
      {
        user: liam._id,
        type: 'ride',
        durationMin: 55,
        caloriesBurned: 470,
        distanceKm: 21.2,
        performedAt: new Date('2026-07-08T17:40:00Z')
      }
    ]);

    await Leaderboard.insertMany([
      {
        user: mia._id,
        points: 980,
        rank: 1,
        weekStart: new Date('2026-07-06T00:00:00Z')
      },
      {
        user: ava._id,
        points: 910,
        rank: 2,
        weekStart: new Date('2026-07-06T00:00:00Z')
      },
      {
        user: noah._id,
        points: 860,
        rank: 3,
        weekStart: new Date('2026-07-06T00:00:00Z')
      },
      {
        user: liam._id,
        points: 790,
        rank: 4,
        weekStart: new Date('2026-07-06T00:00:00Z')
      }
    ]);

    await Workout.insertMany([
      {
        title: 'Power Legs 45',
        category: 'strength',
        targetLevel: 'intermediate',
        durationMin: 45,
        exercises: [
          { name: 'Back Squat', sets: 4, reps: '8', restSec: 120 },
          { name: 'Romanian Deadlift', sets: 3, reps: '10', restSec: 90 },
          { name: 'Walking Lunges', sets: 3, reps: '12/leg', restSec: 60 }
        ]
      },
      {
        title: 'City Tempo Run',
        category: 'cardio',
        targetLevel: 'advanced',
        durationMin: 40,
        exercises: [
          { name: 'Warm-up Jog', sets: 1, reps: '10 min', restSec: 0 },
          { name: 'Tempo Intervals', sets: 5, reps: '3 min hard', restSec: 90 },
          { name: 'Cool Down Walk', sets: 1, reps: '8 min', restSec: 0 }
        ]
      },
      {
        title: 'Foundation Full Body',
        category: 'hybrid',
        targetLevel: 'beginner',
        durationMin: 35,
        exercises: [
          { name: 'Bodyweight Squat', sets: 3, reps: '12', restSec: 60 },
          { name: 'Push-up (Incline)', sets: 3, reps: '10', restSec: 60 },
          { name: 'Plank Hold', sets: 3, reps: '30 sec', restSec: 45 }
        ]
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
