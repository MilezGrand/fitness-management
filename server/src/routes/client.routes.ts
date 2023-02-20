import { Router } from 'express';
import { ClientController } from '../controllers/client.controller.js';

const router = Router();
const clientController = new ClientController();

router.get('/clients', clientController.getClients);
router.get('/clients/:id', clientController.getClient);
router.post('/clients', clientController.createClient);
router.put('/clients', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);

export default router;
