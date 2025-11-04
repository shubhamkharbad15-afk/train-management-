import pool from '../db/connection.js';

// Get all payments with booking details
export const getAllPayments = async (req, res) => {
  try {
    const paymentsQuery = `
      SELECT p.*, b.passenger_id, pass.name as passenger_name
      FROM payments p
      LEFT JOIN booking b ON p.booking_id = b.booking_id
      LEFT JOIN passenger pass ON b.passenger_id = pass.passenger_id
      ORDER BY p.payment_date DESC
    `;
    const bookingsQuery = `
      SELECT b.booking_id, b.passenger_id, pass.name as passenger_name, t.train_name
      FROM booking b
      JOIN passenger pass ON b.passenger_id = pass.passenger_id
      JOIN train t ON b.train_id = t.train_id
      WHERE b.status = 'Confirmed'
    `;
    
    const paymentsResult = await pool.query(paymentsQuery);
    const bookingsResult = await pool.query(bookingsQuery);
    
    res.render('payments', { 
      payments: paymentsResult.rows,
      bookings: bookingsResult.rows
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).send('Error fetching payments');
  }
};

// Add new payment
export const addPayment = async (req, res) => {
  const { booking_id, amount, payment_method, transaction_id, payment_status } = req.body;
  try {
    await pool.query(
      `INSERT INTO payments (booking_id, amount, payment_date, payment_method, transaction_id, payment_status)
       VALUES ($1, $2, CURRENT_DATE, $3, $4, $5)`,
      [booking_id, amount, payment_method, transaction_id, payment_status]
    );
    res.redirect('/payments');
  } catch (error) {
    console.error('Error adding payment:', error);
    res.status(500).send('Error adding payment');
  }
};

// Delete payment
export const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM payments WHERE payment_id = $1', [id]);
    res.redirect('/payments');
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).send('Error deleting payment');
  }
};
