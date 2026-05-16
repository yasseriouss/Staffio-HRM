import { Router } from 'express';
import { PersonnelController } from '../controllers/PersonnelController.js';

const router = Router();

router.get('/', PersonnelController.getAll);
router.get('/:id', PersonnelController.getById);

export default router;
