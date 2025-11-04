import express from 'express';
import bodyParser from 'body-parser';
import trainRoutes from './Routes/trainRoutes.js';
import passengerRoutes from './Routes/passengerRoutes.js';
import bookingRoutes from './Routes/bookingRoutes.js';
import paymentRoutes from './Routes/paymentRoutes.js';
import compartmentRoutes from './Routes/compartmentRoutes.js';
import maintenanceRoutes from './Routes/maintenanceRoutes.js';
import notificationRoutes from './Routes/notificationRoutes.js';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/trains', trainRoutes);
app.use('/passengers', passengerRoutes);
app.use('/bookings', bookingRoutes);
app.use('/payments', paymentRoutes);
app.use('/compartments', compartmentRoutes);
app.use('/maintenance', maintenanceRoutes);
app.use('/notifications', notificationRoutes);

app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('Server running on port 3000'));
