import { Router } from 'express';
import UserController from './controller/UserController';

const router = Router();

router.get('/health', UserController.healthCheck)
router.post('/user', UserController.create);
router.get('/users', UserController.findAll)
router.delete('/user/:id', UserController.delete)

export default router