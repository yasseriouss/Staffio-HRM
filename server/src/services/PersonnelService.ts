import { PersonnelRepository } from '../repositories/PersonnelRepository.js';

export class PersonnelService {
  private repository: PersonnelRepository;

  constructor() {
    this.repository = new PersonnelRepository();
  }

  async getAllPersonnel() {
    // Business logic like filtering or caching could go here
    return await this.repository.getAll();
  }

  async getPersonnelDetails(id: string) {
    const personnel = await this.repository.getById(id);
    if (!personnel) throw new Error('Personnel not found in industrial registry');
    return personnel;
  }
}
