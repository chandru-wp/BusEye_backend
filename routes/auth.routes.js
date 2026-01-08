import express from "express";
import { login, register, getUsers, updateUser, deleteUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
