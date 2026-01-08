import express from "express";
import { updateLocation, getBuses, createBus } from "../controllers/bus.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createBus);
router.put("/location", verifyToken, updateLocation);
router.get("/", verifyToken, getBuses);

export default router;
