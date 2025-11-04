import pool from '../db/connection.js';

// Get all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notificationsQuery = `
      SELECT n.*, p.name as passenger_name, p.contact_no
      FROM notifications n
      LEFT JOIN passenger p ON n.passenger_id = p.passenger_id
      ORDER BY n.sent_timestamp DESC
    `;
    const passengersQuery = 'SELECT * FROM passenger ORDER BY name';
    const bookingsQuery = `
      SELECT b.booking_id, b.passenger_id, pass.name as passenger_name, t.train_name
      FROM booking b
      LEFT JOIN passenger pass ON b.passenger_id = pass.passenger_id
      LEFT JOIN train t ON b.train_id = t.train_id
      WHERE b.status = 'Confirmed'
    `;
    
    const notificationsResult = await pool.query(notificationsQuery);
    const passengersResult = await pool.query(passengersQuery);
    const bookingsResult = await pool.query(bookingsQuery);
    
    res.render('notifications', { 
      notifications: notificationsResult.rows || [],
      passengers: passengersResult.rows || [],
      bookings: bookingsResult.rows || []
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    console.error('Error details:', error.message);
    res.status(500).send('Error fetching notifications: ' + error.message);
  }
};

// Add new notification
export const addNotification = async (req, res) => {
  const { passenger_id, booking_id, message_text, notification_type } = req.body;
  try {
    await pool.query(
      `INSERT INTO notifications (passenger_id, booking_id, message_text, notification_type, sent_timestamp, is_read)
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, false)`,
      [passenger_id, booking_id || null, message_text, notification_type]
    );
    res.redirect('/notifications');
  } catch (error) {
    console.error('Error adding notification:', error);
    res.status(500).send('Error adding notification');
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      'UPDATE notifications SET is_read = true WHERE notification_id = $1',
      [id]
    );
    res.redirect('/notifications');
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).send('Error marking notification as read');
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM notifications WHERE notification_id = $1', [id]);
    res.redirect('/notifications');
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).send('Error deleting notification');
  }
};
