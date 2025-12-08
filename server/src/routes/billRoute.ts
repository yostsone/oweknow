import { Router } from 'express';
import { createBill, editBill, removeBill } from '../controllers/billController';

const router = Router();

router.post('/bill/create', createBill);
router.put('/bill/:id', editBill);
router.delete('/bill/:id', removeBill);

export default router;