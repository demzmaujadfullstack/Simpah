import bcrypt from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@simpah.id",
    },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 12);

    await prisma.user.create({
      data: {
        name: "Administrator",
        email: "admin@simpah.id",
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    console.log("✅ Admin berhasil dibuat");
  } else {
    console.log("ℹ️ Admin sudah ada");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });