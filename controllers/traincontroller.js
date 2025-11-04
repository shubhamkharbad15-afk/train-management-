import pool from "../db/connection.js";

export const getAllTrains = async (req, res) => {
  const result = await pool.query('SELECT * FROM Train ORDER BY train_id');
  res.render('trains', { trains: result.rows });
};

export const addTrain = async (req, res) => {
  const { train_name, source, destination, departure_time, arrival_time, total_seats } = req.body;
  await pool.query(
    'INSERT INTO Train (train_name, source, destination, departure_time, arrival_time, total_seats, available_seats) VALUES ($1,$2,$3,$4,$5,$6,$6)',
    [train_name, source, destination, departure_time, arrival_time, total_seats]
  );
  res.redirect('/trains');
};

export const deleteTrain = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM Train WHERE train_id = $1', [id]);
  res.redirect('/trains');
};
