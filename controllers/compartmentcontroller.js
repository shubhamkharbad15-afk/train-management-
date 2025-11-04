import pool from '../db/connection.js';

// Get all compartments
export const getAllCompartments = async (req, res) => {
  try {
    const compartmentsQuery = `
      SELECT c.*, t.train_name
      FROM traincompartments c
      JOIN train t ON c.train_id = t.train_id
      ORDER BY c.train_id, c.compartment_id
    `;
    const trainsQuery = 'SELECT * FROM train ORDER BY train_name';
    
    const compartmentsResult = await pool.query(compartmentsQuery);
    const trainsResult = await pool.query(trainsQuery);
    
    res.render('compartments', { 
      compartments: compartmentsResult.rows,
      trains: trainsResult.rows,
      seats: [],
      currentCompartmentId: null
    });
  } catch (error) {
    console.error('Error fetching compartments:', error);
    res.status(500).send('Error fetching compartments');
  }
};

// Add new compartment
export const addCompartment = async (req, res) => {
  const { train_id, compartment_type, capacity } = req.body;
  try {
    await pool.query(
      `INSERT INTO traincompartments (train_id, compartment_type, capacity)
       VALUES ($1, $2, $3)`,
      [train_id, compartment_type, capacity]
    );
    res.redirect('/compartments');
  } catch (error) {
    console.error('Error adding compartment:', error);
    res.status(500).send('Error adding compartment');
  }
};

// Delete compartment
export const deleteCompartment = async (req, res) => {
  const { id } = req.params;
  try {
    // First delete all seats in this compartment
    await pool.query('DELETE FROM seats WHERE compartment_id = $1', [id]);
    // Then delete the compartment
    await pool.query('DELETE FROM traincompartments WHERE compartment_id = $1', [id]);
    res.redirect('/compartments');
  } catch (error) {
    console.error('Error deleting compartment:', error);
    res.status(500).send('Error deleting compartment');
  }
};

// Get seats for a specific compartment
export const getSeats = async (req, res) => {
  const { compartmentId } = req.params;
  try {
    const compartmentsQuery = `
      SELECT c.*, t.train_name
      FROM traincompartments c
      JOIN train t ON c.train_id = t.train_id
      ORDER BY c.train_id, c.compartment_id
    `;
    const trainsQuery = 'SELECT * FROM train ORDER BY train_name';
    const seatsQuery = `
      SELECT * FROM seats 
      WHERE compartment_id = $1 
      ORDER BY seat_number
    `;
    
    const compartmentsResult = await pool.query(compartmentsQuery);
    const trainsResult = await pool.query(trainsQuery);
    const seatsResult = await pool.query(seatsQuery, [compartmentId]);
    
    res.render('compartments', { 
      compartments: compartmentsResult.rows,
      trains: trainsResult.rows,
      seats: seatsResult.rows,
      currentCompartmentId: compartmentId
    });
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).send('Error fetching seats');
  }
};

// Add new seat
export const addSeat = async (req, res) => {
  const { compartment_id, seat_number, is_window_seat, is_available } = req.body;
  try {
    await pool.query(
      `INSERT INTO seats (compartment_id, seat_number, is_window_seat, is_available)
       VALUES ($1, $2, $3, $4)`,
      [compartment_id, seat_number, is_window_seat === 'true', is_available === 'true']
    );
    res.redirect(`/compartments/seats/${compartment_id}`);
  } catch (error) {
    console.error('Error adding seat:', error);
    res.status(500).send('Error adding seat');
  }
};

// Delete seat
export const deleteSeat = async (req, res) => {
  const { id } = req.params;
  try {
    // Get compartment_id before deleting
    const result = await pool.query('SELECT compartment_id FROM seats WHERE seat_id = $1', [id]);
    const compartmentId = result.rows[0]?.compartment_id;
    
    await pool.query('DELETE FROM seats WHERE seat_id = $1', [id]);
    
    if (compartmentId) {
      res.redirect(`/compartments/seats/${compartmentId}`);
    } else {
      res.redirect('/compartments');
    }
  } catch (error) {
    console.error('Error deleting seat:', error);
    res.status(500).send('Error deleting seat');
  }
};
