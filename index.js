import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import busRoutes from "./routes/bus.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bus", busRoutes);

import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.listen(5000, async () => {
    console.log("Backend running on http://localhost:5000");
    try {
        await prisma.$connect();
        console.log("✅ DataBase Connected Successfully");
    } catch (error) {
        console.error("❌ Database Connection Failed: Is MongoDB running?");
        console.error(error.message);
    }
});
