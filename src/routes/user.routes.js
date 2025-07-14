import express from "express";
import { User } from "../models/user.model.js";

const router = express.Router();

// POST /api/users — Create a new user
router.post("/users", async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.create({ name, email });

        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;
