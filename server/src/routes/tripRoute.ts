import { Router } from 'express';
import { getTrips, getTrip } from '../controllers/tripController';

const router = Router();

router.get('/trips', getTrips);
router.get('/trip/:id', getTrip);

export default router;