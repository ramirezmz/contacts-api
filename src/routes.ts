import { Router } from 'express';
import UserController from './controller/UserController';

const router = Router();

router.get('/health', UserController.healthCheck)
router.post('/user', UserController.create);
router.get('/users', UserController.findAll)
router.get('/user/:id', UserController.findById)
router.delete('/user/:id', UserController.delete)
router.put('/user/:id', UserController.update)

export default router