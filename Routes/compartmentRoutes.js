import express from 'express';
import { 
  getAllCompartments, 
  addCompartment, 
  deleteCompartment,
  getSeats,
  addSeat,
  deleteSeat
} from '../controllers/compartmentcontroller.js';

const router = express.Router();

// Compartment routes
router.get('/', getAllCompartments);
router.post('/add', addCompartment);
router.get('/delete/:id', deleteCompartment);

// Seat routes
router.get('/seats/:compartmentId', getSeats);
router.post('/seats/add', addSeat);
router.get('/seats/delete/:id', deleteSeat);

export default router;
