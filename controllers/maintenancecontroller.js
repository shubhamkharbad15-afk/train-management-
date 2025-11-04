import pool from '../db/connection.js';

// Get all maintenance records
export const getAllMaintenanceRecords = async (req, res) => {
  try {
    const maintenanceQuery = `
      SELECT m.*, t.train_name
      FROM maintenancerecords m
      JOIN train t ON m.train_id = t.train_id
      ORDER BY m.maintenance_date DESC
    `;
    const trainsQuery = 'SELECT * FROM train ORDER BY train_name';
    
    const maintenanceResult = await pool.query(maintenanceQuery);
    const trainsResult = await pool.query(trainsQuery);
    
    res.render('maintenance', { 
      maintenanceRecords: maintenanceResult.rows,
      trains: trainsResult.rows
    });
  } catch (error) {
    console.error('Error fetching maintenance records:', error);
    res.status(500).send('Error fetching maintenance records');
  }
};

// Add new maintenance record
export const addMaintenanceRecord = async (req, res) => {
  const { train_id, maintenance_date, description_of_work, cost, performed_by_employee_id, next_scheduled_maintenance_date } = req.body;
  try {
    await pool.query(
      `INSERT INTO maintenancerecords (train_id, maintenance_date, description_of_work, cost, performed_by_employee_id, next_scheduled_maintenance_date)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        train_id, 
        maintenance_date, 
        description_of_work, 
        cost, 
        performed_by_employee_id || null, 
        next_scheduled_maintenance_date || null
      ]
    );
    res.redirect('/maintenance');
  } catch (error) {
    console.error('Error adding maintenance record:', error);
    res.status(500).send('Error adding maintenance record');
  }
};

// Delete maintenance record
export const deleteMaintenanceRecord = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM maintenancerecords WHERE maintenance_id = $1', [id]);
    res.redirect('/maintenance');
  } catch (error) {
    console.error('Error deleting maintenance record:', error);
    res.status(500).send('Error deleting maintenance record');
  }
};
