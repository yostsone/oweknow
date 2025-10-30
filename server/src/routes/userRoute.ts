import { Router } from 'express';
import {getTripUsers, createUser, editUser, removeUser} from '../controllers/userController';

const router = Router();

router.get('/users/:tripId', getTripUsers);
router.post('/user/create', createUser);
router.put('/user/:id', editUser);
router.delete('/user/:id', removeUser);

export default router;