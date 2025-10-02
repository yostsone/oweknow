import { Router } from 'express';
import { getTripUsers } from '../controllers/userController';

const router = Router();

router.get('/users/:tripId', getTripUsers);

export default router;