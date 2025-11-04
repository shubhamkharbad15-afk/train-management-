import express from 'express';
import { getAllPassengers, addPassenger, deletePassenger } from '../controllers/passengercontroller.js';
const router = express.Router();

router.get('/', getAllPassengers);
router.post('/add', addPassenger);
router.get('/delete/:id', deletePassenger);

export default router;