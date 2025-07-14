import express from "express";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";

const router = express.Router();

// Create subscription and update users plan
router.post("/subscriptions", async (req, res) => {
    try {
        const { userId, plan } = req.body;

        // 1. Create a subscription
        const subscription = await Subscription.create({
            userId,
            plan,
            status: "active"
        });

        // 2. Update the users plan in User model
        await User.findByIdAndUpdate(userId, { plan });

        res.status(201).json({
            success: true,
            message: "Subscription created and user updated",
            subscription
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
