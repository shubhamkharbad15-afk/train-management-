import express from 'express';
import { getAllTrains, addTrain, deleteTrain } from '../controllers/traincontroller.js';
const router = express.Router();

router.get('/', getAllTrains);
router.post('/add', addTrain);
router.get('/delete/:id', deleteTrain);

export default router;
