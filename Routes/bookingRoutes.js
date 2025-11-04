import express from 'express';
import { getAllBookings, addBooking, deleteBooking } from '../controllers/bookingcontroller.js';
const router = express.Router();

router.get('/', getAllBookings);
router.post('/add', addBooking);
router.get('/delete/:id', deleteBooking);

export default router;