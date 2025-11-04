import pool from './db/connection.js';

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully!');
    console.log('Current time from DB:', result.rows[0].now);
    
    // Check if tables exist
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    
    const tables = await pool.query(tablesQuery);
    console.log('\n📊 Existing tables in database:');
    tables.rows.forEach(row => {
      console.log('  -', row.table_name);
    });
    
    // Check for new tables
    const newTables = ['payments', 'traincompartments', 'seats', 'maintenancerecords', 'notifications'];
    console.log('\n🔍 Checking for new tables:');
    newTables.forEach(tableName => {
      const exists = tables.rows.some(row => row.table_name === tableName);
      console.log(`  ${exists ? '✅' : '❌'} ${tableName}`);
    });
    
    await pool.end();
  } catch (error) {
    console.error('❌ Database error:', error.message);
    process.exit(1);
  }
}

testDatabase();
