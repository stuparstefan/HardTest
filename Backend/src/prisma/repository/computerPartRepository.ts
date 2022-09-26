import { ComputerPart, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ComputerPartRepository {
  async get() {
    return await prisma.computerPart.findMany();
  }

  async insert(data: ComputerPart[]) {
    return await prisma.computerPart.createMany({
      data,
      skipDuplicates: true,
    });
  }
}

export const computerPartRepository = new ComputerPartRepository();
