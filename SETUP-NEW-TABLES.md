# Setup Guide for New Tables

This guide will help you set up the new database tables and integrate them with your Train Management System.

## New Tables Added

1. **Payments** - Track financial transactions for bookings
2. **TrainCompartments** - Manage train compartment configurations
3. **Seats** - Detailed seat management within compartments
4. **MaintenanceRecords** - Log train maintenance activities
5. **Notifications** - Send notifications to passengers

## Database Setup Steps

### Step 1: Create the New Tables

Run the SQL commands from `new-tables-schema.sql` in your PostgreSQL database:

```bash
psql -U postgres -d Train_db -f new-tables-schema.sql
```

Or manually execute the SQL commands in your PostgreSQL client (pgAdmin, DBeaver, etc.)

### Step 2: Verify Table Creation

Connect to your database and verify all tables are created:

```sql
\dt
```

You should see the following new tables:
- payments
- traincompartments
- seats
- maintenancerecords
- notifications

### Step 3: Check Foreign Key Relationships

Verify that foreign keys are properly set up:

```sql
-- Check payments table
SELECT * FROM information_schema.table_constraints 
WHERE table_name = 'payments';

-- Check other tables similarly
```

## UI Components Created

### 1. Payments Module (`/payments`)
**Files Created:**
- `views/payments.ejs` - Payment management UI
- `controllers/paymentcontroller.js` - Payment business logic
- `Routes/paymentRoutes.js` - Payment routes

**Features:**
- View all payment transactions
- Add new payments linked to bookings
- Track payment status (Success, Pending, Failed)
- Support multiple payment methods

### 2. Compartments & Seats Module (`/compartments`)
**Files Created:**
- `views/compartments.ejs` - Compartment and seat management UI
- `controllers/compartmentcontroller.js` - Compartment business logic
- `Routes/compartmentRoutes.js` - Compartment routes

**Features:**
- Manage train compartments by type
- View and add seats within compartments
- Track seat availability and window seat status
- Hierarchical view: Train → Compartments → Seats

### 3. Maintenance Module (`/maintenance`)
**Files Created:**
- `views/maintenance.ejs` - Maintenance records UI
- `controllers/maintenancecontroller.js` - Maintenance business logic
- `Routes/maintenanceRoutes.js` - Maintenance routes

**Features:**
- Log maintenance activities
- Track costs and employee information
- Schedule next maintenance dates
- View maintenance history by train

### 4. Notifications Module (`/notifications`)
**Files Created:**
- `views/notifications.ejs` - Notification management UI
- `controllers/notificationcontroller.js` - Notification business logic
- `Routes/notificationRoutes.js` - Notification routes

**Features:**
- Send notifications to passengers
- Support SMS, Email, and App Alerts
- Mark notifications as read/unread
- Link notifications to specific bookings

## Testing the New Features

### 1. Start the Server

```bash
npm start
```

### 2. Access the Application

Open your browser and navigate to: `http://localhost:3000`

### 3. Test Each Module

**Payments:**
1. Go to `/payments`
2. Create a booking first if you don't have any
3. Add a payment for an existing booking
4. Verify payment appears in the list

**Compartments:**
1. Go to `/compartments`
2. Add a compartment for an existing train
3. Click "View Seats" to manage seats
4. Add seats with different configurations

**Maintenance:**
1. Go to `/maintenance`
2. Add a maintenance record for a train
3. Include cost and next scheduled date
4. Verify record appears in the list

**Notifications:**
1. Go to `/notifications`
2. Select a passenger and create a notification
3. Mark it as read
4. Verify status changes

## Database Relationships

```
Train (1) ──→ (Many) TrainCompartments
TrainCompartments (1) ──→ (Many) Seats
Train (1) ──→ (Many) MaintenanceRecords
Booking (1) ──→ (Many) Payments
Passenger (1) ──→ (Many) Notifications
Booking (1) ──→ (Many) Notifications
```

## Important Notes

1. **Foreign Key Constraints**: All new tables have proper foreign key relationships. Deleting a parent record will cascade to child records where appropriate.

2. **Data Validation**: The UI includes validation for:
   - Payment methods and status
   - Compartment types
   - Notification types
   - Maintenance costs (must be positive)

3. **Indexes**: Performance indexes have been created on frequently queried columns.

4. **Sample Data**: The schema file includes commented sample data. Uncomment and modify as needed.

## Troubleshooting

### Issue: Foreign Key Constraint Errors
**Solution**: Ensure parent records exist before creating child records. For example, create trains before adding compartments.

### Issue: Module Not Loading
**Solution**: Verify that:
- All files are in the correct directories
- `server.js` includes all route imports
- PostgreSQL tables are created successfully

### Issue: Empty Dropdowns in Forms
**Solution**: Add data to parent tables first:
- Add trains before creating compartments
- Add passengers before sending notifications
- Add bookings before adding payments

## Next Steps

1. **Create the database tables** using the provided SQL schema
2. **Restart your server** to load the new routes
3. **Test each module** to ensure everything works correctly
4. **Add sample data** to test relationships between tables

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify database connection in `db/connection.js`
3. Ensure all tables are created with proper constraints
4. Check that foreign key relationships are correct

Happy coding! 🚂
