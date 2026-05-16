import type { Request, Response } from 'express';
import { PersonnelService } from '../services/PersonnelService.js';

const personnelService = new PersonnelService();

export class PersonnelController {
  static async getAll(req: Request, res: Response) {
    try {
      const data = await personnelService.getAllPersonnel();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: 'CORE_EXECUTION_FAILURE', message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: 'INVALID_REQUEST', message: 'Personnel ID is required' });
        return;
      }
      const data = await personnelService.getPersonnelDetails(id as string);
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ error: 'DATA_RETRIEVAL_ERROR', message: error.message });
    }
  }
}
