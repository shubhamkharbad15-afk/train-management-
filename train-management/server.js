import express from 'express';
import bodyParser from 'body-parser';
import trainRoutes from './routes/trainRoutes.js';
import passengerRoutes from './routes/passengerRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/trains', trainRoutes);
app.use('/passengers', passengerRoutes);
app.use('/bookings', bookingRoutes);

app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('Server running on port 3000'));
