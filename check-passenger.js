import pool from './db/connection.js';

async function checkPassenger() {
  try {
    const query = `
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'passenger'
      ORDER BY ordinal_position;
    `;
    
    const result = await pool.query(query);
    console.log('Passenger table columns:');
    result.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type}`);
    });
    
    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkPassenger();
