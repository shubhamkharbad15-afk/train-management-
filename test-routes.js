import express from 'express';
import paymentRoutes from './Routes/paymentRoutes.js';
import compartmentRoutes from './Routes/compartmentRoutes.js';
import maintenanceRoutes from './Routes/maintenanceRoutes.js';
import notificationRoutes from './Routes/notificationRoutes.js';

console.log('Testing route imports...\n');

console.log('✅ paymentRoutes imported:', typeof paymentRoutes);
console.log('✅ compartmentRoutes imported:', typeof compartmentRoutes);
console.log('✅ maintenanceRoutes imported:', typeof maintenanceRoutes);
console.log('✅ notificationRoutes imported:', typeof notificationRoutes);

console.log('\n✅ All routes imported successfully!');
console.log('\nIf you see this message, the route files are correct.');
console.log('The issue is likely that you need to restart your server.');
console.log('\nSteps to fix:');
console.log('1. Stop the server (Ctrl+C in the terminal)');
console.log('2. Run: npm start');
console.log('3. Try accessing the pages again');
