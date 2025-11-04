import pool from "../db/connection.js";

export const getAllPassengers = async (req, res) => {
  const result = await pool.query('SELECT * FROM Passenger ORDER BY passenger_id');
  res.render('passengers', { passengers: result.rows });
};

export const addPassenger = async (req, res) => {
  const { name, age, gender, contact_no } = req.body;
  await pool.query(
    'INSERT INTO Passenger (name, age, gender, contact_no) VALUES ($1, $2, $3, $4)',
    [name, age, gender, contact_no]
  );
  res.redirect('/passengers');
};

export const deletePassenger = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM Passenger WHERE passenger_id = $1', [id]);
  res.redirect('/passengers');
};