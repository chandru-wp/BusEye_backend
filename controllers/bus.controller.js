import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const createBus = async (req, res) => {
    const { busNo, route } = req.body;
    try {
        const bus = await prisma.bus.create({
            data: { busNo, route }
        });
        res.json(bus);
    } catch (err) {
        res.status(500).json({ error: "Failed to create bus" });
    }
};

export const updateLocation = async (req, res) => {
    const { busId, latitude, longitude } = req.body;
    console.log(`📍 Update Bus ${busId}: ${latitude}, ${longitude}`);

    try {
        const bus = await prisma.bus.update({
            where: { id: busId },
            data: { latitude, longitude }
        });
        res.json(bus);
    } catch (error) {
        console.error("Update Bus Location Error:", error);
        res.status(500).json({ error: "Failed to update location" });
    }
};

export const getBuses = async (req, res) => {
    const buses = await prisma.bus.findMany();
    res.json(buses);
};
