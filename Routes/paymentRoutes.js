import express from 'express';
import { getAllPayments, addPayment, deletePayment } from '../controllers/paymentcontroller.js';

const router = express.Router();

router.get('/', getAllPayments);
router.post('/add', addPayment);
router.get('/delete/:id', deletePayment);

export default router;
