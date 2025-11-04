import express from 'express';
import { getAllMaintenanceRecords, addMaintenanceRecord, deleteMaintenanceRecord } from '../controllers/maintenancecontroller.js';

const router = express.Router();

router.get('/', getAllMaintenanceRecords);
router.post('/add', addMaintenanceRecord);
router.get('/delete/:id', deleteMaintenanceRecord);

export default router;
