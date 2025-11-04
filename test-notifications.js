import pool from './db/connection.js';

async function testNotifications() {
  try {
    console.log('Testing notifications table...\n');
    
    // Check table structure
    const structureQuery = `
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'notifications'
      ORDER BY ordinal_position;
    `;
    
    const structure = await pool.query(structureQuery);
    console.log('📋 Notifications table structure:');
    structure.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type}`);
    });
    
    // Try to query notifications
    console.log('\n🔍 Querying notifications...');
    const result = await pool.query('SELECT * FROM notifications LIMIT 5');
    console.log(`Found ${result.rows.length} notification(s)`);
    
    // Check if passengers exist
    const passengerCount = await pool.query('SELECT COUNT(*) FROM passenger');
    console.log(`\n👥 Passengers in database: ${passengerCount.rows[0].count}`);
    
    if (passengerCount.rows[0].count === '0') {
      console.log('\n⚠️  WARNING: No passengers found!');
      console.log('You need to add passengers first before creating notifications.');
      console.log('Go to: http://localhost:3000/passengers');
    }
    
    await pool.end();
    console.log('\n✅ Test completed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testNotifications();
