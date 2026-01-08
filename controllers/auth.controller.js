import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log("Registering user:", { name, email, role });

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            console.log("User already exists:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hash, role }
        });

        console.log("User created:", user.id);
        res.json(user);
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("🔐 Login attempt for:", email);
        console.log("📦 Request body:", { email, password: password ? "***" : "missing" });

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(404).json({ message: "User not found" });
        }

        console.log("✅ User found:", { id: user.id, email: user.email, role: user.role });

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log("❌ Invalid password for:", email);
            return res.status(401).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || "SECRET_KEY"
        );

        console.log("✅ Login successful for:", email, "- Role:", user.role);
        res.json({ token, role: user.role });
    } catch (error) {
        console.error("❌❌❌ Login error:", error);
        console.error("Error stack:", error.stack);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
// ... existing login/register functions ...

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;
        // Optionally update password if provided

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, email, role }
        });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: "Failed to update user" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({ where: { id } });
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};
