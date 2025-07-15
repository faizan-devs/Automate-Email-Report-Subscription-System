import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";

// Connect to DB
await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");

// Optional: Clear existing data (for clean test)
await User.deleteMany();
await Subscription.deleteMany();

// Insert sample users
const now = new Date();
const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

const users = await User.insertMany([
    { name: "Faizan", email: "faizan@example.com", createdAt: yesterday },
    { name: "Ayan", email: "ayan@example.com", createdAt: now },
    { name: "Sara", email: "sara@example.com", createdAt: now },
    { name: "Zara", email: "zara@example.com", createdAt: yesterday },
    { name: "Ali", email: "ali@example.com", createdAt: now },
]);

console.log("Sample users inserted");

// Insert sample subscriptions
await Subscription.insertMany([
    { userId: users[0]._id, plan: "basic", status: "active" },
    { userId: users[1]._id, plan: "pro", status: "active" },
    { userId: users[2]._id, plan: "pro", status: "cancelled" },
]);

console.log("Sample subscriptions inserted");

// Reporting logic
const totalUsers = await User.countDocuments();

const today = new Date();
today.setHours(0, 0, 0, 0);

const newUsersToday = await User.countDocuments({
    createdAt: { $gte: today },
});

const totalSubscriptions = await Subscription.countDocuments({
    status: "active",
});

const subsByPlan = await Subscription.aggregate([
    { $match: { status: "active" } },
    { $group: { _id: "$plan", count: { $sum: 1 } } }
]);

console.log("Report Summary:");
console.log(`Total Users: ${totalUsers}`);
console.log(`New Users Today: ${newUsersToday}`);
console.log(`Total Active Subscriptions: ${totalSubscriptions}`);
console.log("Subscriptions by Plan:");
subsByPlan.forEach(plan => {
    console.log(` - ${plan._id}: ${plan.count}`);
});

// Disconnect
await mongoose.disconnect();
console.log("Done.");
