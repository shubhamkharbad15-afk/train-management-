import pool from "../db/connection.js";

export const getAllBookings = async (req, res) => {
  const bookingsResult = await pool.query(`
    SELECT b.booking_id, b.booking_date, b.seat_no, b.status,
           p.name as passenger_name, t.train_name
    FROM Booking b
    JOIN Passenger p ON b.passenger_id = p.passenger_id
    JOIN Train t ON b.train_id = t.train_id
    ORDER BY b.booking_id
  `);
  const passengersResult = await pool.query('SELECT * FROM Passenger ORDER BY name');
  const trainsResult = await pool.query('SELECT * FROM Train WHERE available_seats > 0 ORDER BY train_name');
  
  res.render('bookings', {
    bookings: bookingsResult.rows,
    passengers: passengersResult.rows,
    trains: trainsResult.rows
  });
};

export const addBooking = async (req, res) => {
  const { passenger_id, train_id, seat_no } = req.body;
  
  try {
    await pool.query('BEGIN');
    
    // Check if seat is available
    const trainResult = await pool.query(
      'SELECT available_seats FROM Train WHERE train_id = $1',
      [train_id]
    );
    
    if (trainResult.rows[0].available_seats <= 0) {
      await pool.query('ROLLBACK');
      return res.send('No seats available!');
    }
    
    // Create booking
    await pool.query(
      'INSERT INTO Booking (passenger_id, train_id, booking_date, seat_no, status) VALUES ($1, $2, CURRENT_DATE, $3, $4)',
      [passenger_id, train_id, seat_no, 'Confirmed']
    );
    
    // Update available seats
    await pool.query(
      'UPDATE Train SET available_seats = available_seats - 1 WHERE train_id = $1',
      [train_id]
    );
    
    await pool.query('COMMIT');
    res.redirect('/bookings');
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Booking error:', error);
    res.send('Error creating booking');
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  
  try {
    await pool.query('BEGIN');
    
    // Get train_id before deleting
    const bookingResult = await pool.query(
      'SELECT train_id FROM Booking WHERE booking_id = $1',
      [id]
    );
    
    if (bookingResult.rows.length > 0) {
      const train_id = bookingResult.rows[0].train_id;
      
      // Delete booking
      await pool.query('DELETE FROM Booking WHERE booking_id = $1', [id]);
      
      // Restore available seat
      await pool.query(
        'UPDATE Train SET available_seats = available_seats + 1 WHERE train_id = $1',
        [train_id]
      );
    }
    
    await pool.query('COMMIT');
    res.redirect('/bookings');
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Delete booking error:', error);
    res.send('Error canceling booking');
  }
};