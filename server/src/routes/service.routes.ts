import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller.js';

const router = Router();
const serviceController = new ServiceController();

router.get('/service/:id', serviceController.getServices);
router.post('/service', serviceController.createService);

export default router;
