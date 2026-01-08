import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function checkDatabase() {
    try {
        console.log("🔍 Checking database...");

        const users = await prisma.user.findMany();
        console.log(`👥 Users in database: ${users.length}`);
        users.forEach(u => console.log(`  - ${u.name} (${u.email}) - ${u.role}`));

        const buses = await prisma.bus.findMany();
        console.log(`\n🚌 Buses in database: ${buses.length}`);
        buses.forEach(b => console.log(`  - ${b.busNo} (${b.route}) - Location: ${b.latitude}, ${b.longitude}`));

        console.log("\n✅ Database check complete!");
    } catch (error) {
        console.error("❌ Database error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkDatabase();
