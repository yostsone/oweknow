import { Router } from 'express';
import { getTrips, getTrip, createTrip, removeTrip, editTrip } from '../controllers/tripController';
import { getTripUsers } from '../controllers/userController';

const router = Router();

router.get('/trips', getTrips);
router.get('/trip/:id', getTrip);
router.get('/trip/:id/users', getTripUsers);
router.post('/trip/create', createTrip);
router.put('/trip/:id', editTrip);
router.delete('/trip/:id', removeTrip);

export default router;