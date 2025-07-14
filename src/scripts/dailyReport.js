// scripts/dailyReport.js
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";

// Step 1: Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI);
// console.log("MongoDB connected");

// Step 2: Collect data
const totalUsers = await User.countDocuments();

const today = new Date();
today.setHours(0, 0, 0, 0);

const newUsersToday = await User.countDocuments({
    createdAt: { $gte: today },
});

const totalSubscriptions = await Subscription.countDocuments({
    status: "active"
});

const currentDate = new Date().toLocaleDateString();

// Step 3: Create HTML content
const htmlContent = `
<div style="font-family: Arial, sans-serif;">
    <h2>Daily Report (${currentDate})</h2>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
            <tr><th>Metric</th><th>Value</th></tr>
            <tr><td>Total Users</td><td>${totalUsers}</td></tr>
            <tr><td>New Users Today</td><td>${newUsersToday}</td></tr>
            <tr><td>Total Subscriptions</td><td>${totalSubscriptions}</td></tr>
        </table>
    <p style="color: grey; font-size: 0.9em;">Generated automatically by your backend system.</p>
</div>
`;

// Step 4: Send Email
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const mailOptions = {
    from: `"Backend Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // replace
    subject: `Daily Report - ${currentDate}`,
    html: htmlContent,
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.error("Failed to send email:", err.message);
    } else {
        console.log("Email sent:", info.response);
    }
    mongoose.connection.close();
});
