import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./src/routes/user.routes.js";
import subscriptionRoutes from "./src/routes/subscription.routes.js";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", subscriptionRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error("MongoDB error:", err.message));
