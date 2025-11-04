# Train Management System

A web-based train management system built with Node.js, Express, PostgreSQL, and EJS.

## Features

- **Train Management**: Add, view, and delete trains
- **Passenger Management**: Add, view, and delete passengers
- **Booking System**: Create and cancel bookings with automatic seat management
- **Real-time Seat Availability**: Automatically updates available seats on booking/cancellation
- **Payment Processing**: Track payment transactions with multiple payment methods (Credit Card, UPI, Cash, etc.)
- **Compartment & Seat Management**: Manage train compartments and individual seat configurations
- **Maintenance Records**: Log and track train maintenance activities and schedules
- **Notification System**: Send notifications to passengers via SMS, Email, or App Alerts

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up PostgreSQL database:**
   - Make sure PostgreSQL is running on your system
   - Update database credentials in `db/connection.js`:
     - `user`: Your PostgreSQL username (default: 'postgres')
     - `password`: Your PostgreSQL password
     - `database`: 'Train_db'
     - `host`: 'localhost'
     - `port`: 5432

3. **Create the database and tables:**
   ```bash
   psql -U postgres -f database.sql
   ```
   Or manually run the SQL commands from `database.sql` in your PostgreSQL client.

## Running the Application

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Access the application:**
   Open your browser and navigate to: `http://localhost:3000`

## Project Structure

```
train-management/
├── controllers/          # Business logic
│   ├── traincontroller.js
│   ├── passengercontroller.js
│   ├── bookingcontroller.js
│   ├── paymentcontroller.js
│   ├── compartmentcontroller.js
│   ├── maintenancecontroller.js
│   └── notificationcontroller.js
├── Routes/              # Route definitions
│   ├── trainRoutes.js
│   ├── passengerRoutes.js
│   ├── bookingRoutes.js
│   ├── paymentRoutes.js
│   ├── compartmentRoutes.js
│   ├── maintenanceRoutes.js
│   └── notificationRoutes.js
├── db/                  # Database connection
│   └── connection.js
├── views/               # EJS templates
│   ├── index.ejs
│   ├── trains.ejs
│   ├── passengers.ejs
│   ├── bookings.ejs
│   ├── payments.ejs
│   ├── compartments.ejs
│   ├── maintenance.ejs
│   ├── notifications.ejs
│   └── partials/
│       └── header.ejs
├── public/              # Static files
│   └── css/
│       └── style.css
├── server.js            # Main application file
├── package.json         # Dependencies
└── database.sql         # Database schema

```

## Usage

### Managing Trains
- Navigate to `/trains` to view all trains
- Add new trains using the form at the bottom
- Delete trains by clicking the "Delete" link

### Managing Passengers
- Navigate to `/passengers` to view all passengers
- Add new passengers using the form
- Delete passengers by clicking the "Delete" link

### Managing Bookings
- Navigate to `/bookings` to view all bookings
- Create new bookings by selecting a passenger and train
- Cancel bookings by clicking the "Cancel" link
- Available seats are automatically updated

### Managing Payments
- Navigate to `/payments` to view all payment transactions
- Add new payments by selecting a booking and entering payment details
- Track payment status (Success, Pending, Failed)
- Support for multiple payment methods (Credit Card, UPI, Cash, etc.)

### Managing Compartments & Seats
- Navigate to `/compartments` to view train compartments
- Add compartments with different types (Sleeper, AC, etc.)
- Click "View Seats" to manage individual seats in a compartment
- Add seats with specific configurations (window seat, availability)

### Managing Maintenance Records
- Navigate to `/maintenance` to view maintenance history
- Log maintenance activities with date, description, and cost
- Track next scheduled maintenance dates
- Record employee information for maintenance work

### Managing Notifications
- Navigate to `/notifications` to view all notifications
- Send notifications to passengers via SMS, Email, or App Alerts
- Mark notifications as read
- Track notification delivery status

## Database Configuration

If you need to change the database credentials, edit `db/connection.js`:

```javascript
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'Train_db',
  password: 'your_password',
  port: 5432,
});
```

## Troubleshooting

- **Cannot find module error**: Make sure all dependencies are installed with `npm install`
- **Database connection error**: Verify PostgreSQL is running and credentials are correct
- **Port already in use**: Change the port in `server.js` (default: 3000)
