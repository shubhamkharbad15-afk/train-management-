# API Endpoints Reference

Quick reference for all available routes in the Train Management System.

## 🏠 Home
```
GET  /                    # Home page with feature overview
```

## 🚂 Trains
```
GET  /trains              # View all trains
POST /trains/add          # Add new train
GET  /trains/delete/:id   # Delete train by ID
```

## 👥 Passengers
```
GET  /passengers              # View all passengers
POST /passengers/add          # Add new passenger
GET  /passengers/delete/:id   # Delete passenger by ID
```

## 🎫 Bookings
```
GET  /bookings              # View all bookings
POST /bookings/add          # Create new booking
GET  /bookings/delete/:id   # Cancel booking by ID
```

## 💳 Payments
```
GET  /payments              # View all payments
POST /payments/add          # Add new payment
GET  /payments/delete/:id   # Delete payment by ID
```

**POST /payments/add Parameters:**
- `booking_id` (required) - ID of the booking
- `amount` (required) - Payment amount
- `payment_method` (required) - Credit Card, Debit Card, UPI, Net Banking, Cash
- `transaction_id` (required) - Unique transaction identifier
- `payment_status` (required) - Success, Pending, Failed

## 🚃 Compartments & Seats
```
GET  /compartments                    # View all compartments
POST /compartments/add                # Add new compartment
GET  /compartments/delete/:id         # Delete compartment by ID
GET  /compartments/seats/:compartmentId   # View seats in compartment
POST /compartments/seats/add          # Add new seat
GET  /compartments/seats/delete/:id   # Delete seat by ID
```

**POST /compartments/add Parameters:**
- `train_id` (required) - ID of the train
- `compartment_type` (required) - General, Sleeper, AC 3 Tier, AC 2 Tier, AC First Class, Executive Class
- `capacity` (required) - Number of seats

**POST /compartments/seats/add Parameters:**
- `compartment_id` (required) - ID of the compartment
- `seat_number` (required) - Seat identifier (e.g., A1, B23)
- `is_window_seat` (required) - true/false
- `is_available` (required) - true/false

## 🔧 Maintenance
```
GET  /maintenance              # View all maintenance records
POST /maintenance/add          # Add new maintenance record
GET  /maintenance/delete/:id   # Delete maintenance record by ID
```

**POST /maintenance/add Parameters:**
- `train_id` (required) - ID of the train
- `maintenance_date` (required) - Date of maintenance
- `description_of_work` (required) - Description of work performed
- `cost` (required) - Maintenance cost
- `performed_by_employee_id` (optional) - Employee ID
- `next_scheduled_maintenance_date` (optional) - Next scheduled date

## 🔔 Notifications
```
GET  /notifications                # View all notifications
POST /notifications/add            # Send new notification
GET  /notifications/mark-read/:id  # Mark notification as read
GET  /notifications/delete/:id     # Delete notification by ID
```

**POST /notifications/add Parameters:**
- `passenger_id` (required) - ID of the passenger
- `booking_id` (optional) - ID of related booking
- `message_text` (required) - Notification message
- `notification_type` (required) - SMS, Email, App Alert, Push Notification

## 📊 Response Format

All routes render EJS templates with data. No JSON API endpoints currently.

### Success Responses
- Redirects to the respective list page after successful operations
- Displays updated data in tables

### Error Responses
- 500 Internal Server Error with error message
- Console logs error details for debugging

## 🔐 Authentication

Currently, no authentication is implemented. All endpoints are publicly accessible.

**Recommended for Production:**
- Add user authentication middleware
- Implement role-based access control
- Add API rate limiting
- Implement CSRF protection

## 📝 Database Tables

### Existing Tables
- `train` - Train information
- `passenger` - Passenger details
- `booking` - Booking records

### New Tables
- `payments` - Payment transactions
- `traincompartments` - Train compartments
- `seats` - Individual seats
- `maintenancerecords` - Maintenance logs
- `notifications` - Passenger notifications

## 🔗 Table Relationships

```
train (1:M) traincompartments (1:M) seats
train (1:M) maintenancerecords
booking (1:M) payments
booking (1:M) notifications
passenger (1:M) notifications
```

## 🛠️ Development Tips

### Adding New Routes
1. Create controller in `controllers/`
2. Create route file in `Routes/`
3. Import and register in `server.js`
4. Create EJS view in `views/`

### Database Queries
- All controllers use `pool.query()` from `db/connection.js`
- Use parameterized queries to prevent SQL injection
- Handle errors with try-catch blocks

### Form Handling
- All forms use POST method
- Body parser middleware handles form data
- Redirects after successful operations

## 📱 Frontend

### Technologies
- **Template Engine:** EJS
- **Styling:** Custom CSS with gradients
- **Forms:** HTML5 with validation
- **Tables:** Responsive with hover effects

### Key Files
- `views/` - EJS templates
- `public/css/style.css` - Stylesheet
- `views/partials/header.ejs` - Navigation header

## 🚀 Quick Commands

```bash
# Start server
npm start

# Create database tables
psql -U postgres -d Train_db -f new-tables-schema.sql

# View logs
# Check console output for errors and info

# Access application
http://localhost:3000
```

## 📞 Support

For issues or questions:
1. Check console logs for errors
2. Verify database connection
3. Ensure all tables are created
4. Check foreign key relationships

---

**Last Updated:** November 2024
**Version:** 2.0 (with new modules)
