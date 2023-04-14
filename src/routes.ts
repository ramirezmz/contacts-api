import { Router } from 'express';
import UserController from './controller/UserController';

const router = Router();

router.get('/health', UserController.healthCheck)
router.post('/register', UserController.create);
router.get('/users', UserController.findAll)
router.get('/user/:id', UserController.findById)
router.get('/user', UserController.findByIdWithToken)
router.delete('/user/:id', UserController.delete)
router.put('/user/:id', UserController.update)

router.post('/auth/login', UserController.login)

// create a contact
router.post('/contact/:id', UserController.createContact)

// get all users contacts
router.get('/me/contacts', UserController.getContacts)

// remove a contact
router.delete('/me/contact/:id', UserController.removeContact)

// update a contact
router.put('/me/contact/:id', UserController.updateContact)

export default router