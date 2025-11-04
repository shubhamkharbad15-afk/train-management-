import express from 'express';
import { getAllNotifications, addNotification, markAsRead, deleteNotification } from '../controllers/notificationcontroller.js';

const router = express.Router();

router.get('/', getAllNotifications);
router.post('/add', addNotification);
router.get('/mark-read/:id', markAsRead);
router.get('/delete/:id', deleteNotification);

export default router;
