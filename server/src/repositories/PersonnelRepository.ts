import { prisma } from '../index.js';

export class PersonnelRepository {
  async getAll() {
    return await prisma.personnel.findMany({
      include: {
        position: true,
        unit: true
      }
    });
  }

  async getById(id: string) {
    return await prisma.personnel.findUnique({
      where: { id },
      include: {
        position: true,
        unit: true
      }
    });
  }

  async create(data: any) {
    return await prisma.personnel.create({
      data
    });
  }
}
