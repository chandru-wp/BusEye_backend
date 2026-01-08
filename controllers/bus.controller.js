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
    console.log(`📍 Location Update Request:`, { busId, latitude, longitude });

    try {
        const bus = await prisma.bus.update({
            where: { id: busId },
            data: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            }
        });
        console.log(`✅ Location Updated Successfully:`, bus);
        res.json(bus);
    } catch (error) {
        console.error("❌ Update Bus Location Error:", error);
        res.status(500).json({ error: "Failed to update location" });
    }
};

export const getBuses = async (req, res) => {
    try {
        const buses = await prisma.bus.findMany();
        console.log(`🚌 Fetched ${buses.length} buses:`, buses.map(b => ({
            id: b.id,
            busNo: b.busNo,
            hasLocation: !!(b.latitude && b.longitude),
            lat: b.latitude,
            lng: b.longitude
        })));
        res.json(buses);
    } catch (error) {
        console.error("❌ Get Buses Error:", error);
        res.status(500).json({ error: "Failed to fetch buses" });
    }
};
