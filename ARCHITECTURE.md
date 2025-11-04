# System Architecture

## 📐 Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│                    (User Interface)                          │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP Requests
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      Express Server                          │
│                     (server.js)                              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Route Handlers                          │  │
│  │  ┌──────────┬──────────┬──────────┬──────────┐     │  │
│  │  │ Trains   │Passengers│ Bookings │ Payments │     │  │
│  │  ├──────────┼──────────┼──────────┼──────────┤     │  │
│  │  │Compart-  │Mainten-  │Notifica- │          │     │  │
│  │  │ments     │ance      │tions     │          │     │  │
│  │  └──────────┴──────────┴──────────┴──────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                   │
│                         ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Controllers                             │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │  Business Logic & Data Processing            │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                   │
│                         ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Database Connection Pool                   │  │
│  │              (db/connection.js)                      │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ SQL Queries
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   PostgreSQL Database                        │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Train   │  │Passenger │  │ Booking  │  │ Payments │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Compart-  │  │  Seats   │  │Mainten-  │  │Notifica- │   │
│  │ments     │  │          │  │ance      │  │tions     │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🗂️ Directory Structure

```
train-management/
│
├── 📁 controllers/              # Business Logic Layer
│   ├── traincontroller.js       # Train CRUD operations
│   ├── passengercontroller.js   # Passenger CRUD operations
│   ├── bookingcontroller.js     # Booking management
│   ├── paymentcontroller.js     # Payment processing
│   ├── compartmentcontroller.js # Compartment & seat management
│   ├── maintenancecontroller.js # Maintenance logging
│   └── notificationcontroller.js# Notification handling
│
├── 📁 Routes/                   # Route Definitions
│   ├── trainRoutes.js           # /trains endpoints
│   ├── passengerRoutes.js       # /passengers endpoints
│   ├── bookingRoutes.js         # /bookings endpoints
│   ├── paymentRoutes.js         # /payments endpoints
│   ├── compartmentRoutes.js     # /compartments endpoints
│   ├── maintenanceRoutes.js     # /maintenance endpoints
│   └── notificationRoutes.js    # /notifications endpoints
│
├── 📁 views/                    # Presentation Layer (EJS)
│   ├── index.ejs                # Home page
│   ├── trains.ejs               # Train management UI
│   ├── passengers.ejs           # Passenger management UI
│   ├── bookings.ejs             # Booking management UI
│   ├── payments.ejs             # Payment management UI
│   ├── compartments.ejs         # Compartment & seat UI
│   ├── maintenance.ejs          # Maintenance records UI
│   ├── notifications.ejs        # Notification management UI
│   └── partials/
│       └── header.ejs           # Shared navigation header
│
├── 📁 public/                   # Static Assets
│   └── css/
│       └── style.css            # Application styles
│
├── 📁 db/                       # Database Layer
│   └── connection.js            # PostgreSQL connection pool
│
├── 📄 server.js                 # Application entry point
├── 📄 package.json              # Dependencies
├── 📄 new-tables-schema.sql     # Database schema
└── 📄 README.md                 # Documentation
```

## 🔄 Request Flow

### Example: Adding a Payment

```
1. User fills payment form in browser
   └─> /payments page (payments.ejs)

2. Form submits POST request
   └─> POST /payments/add

3. Express routes to handler
   └─> paymentRoutes.js

4. Controller processes request
   └─> paymentcontroller.js → addPayment()

5. Database query executed
   └─> INSERT INTO payments...

6. Response sent
   └─> Redirect to /payments

7. Updated list displayed
   └─> payments.ejs renders with new data
```

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌─────────────┐
│    Train    │
│─────────────│
│ train_id PK │◄──────────┐
│ train_name  │            │
│ source      │            │
│ destination │            │
│ ...         │            │
└─────────────┘            │
       ▲                   │
       │                   │
       │                   │
       │1                  │1
       │                   │
       │M                  │M
       │                   │
┌──────┴──────────┐  ┌────┴──────────────┐
│TrainCompartments│  │MaintenanceRecords │
│─────────────────│  │───────────────────│
│compartment_id PK│  │maintenance_id PK  │
│train_id FK      │  │train_id FK        │
│compartment_type │  │maintenance_date   │
│capacity         │  │description        │
└────────┬────────┘  │cost               │
         │           └───────────────────┘
         │1
         │
         │M
         │
    ┌────┴─────┐
    │  Seats   │
    │──────────│
    │seat_id PK│
    │compart FK│
    │seat_no   │
    │is_window │
    │available │
    └──────────┘

┌─────────────┐
│  Passenger  │
│─────────────│
│passenger_id │◄────────────┐
│name         │              │
│email        │              │
│phone        │              │
└─────────────┘              │
       ▲                     │
       │                     │
       │1                    │1
       │                     │
       │M                    │M
       │                     │
┌──────┴──────┐      ┌───────┴────────┐
│   Booking   │      │ Notifications  │
│─────────────│      │────────────────│
│booking_id PK│◄──┐  │notification_id │
│passenger_id │   │  │passenger_id FK │
│train_id FK  │   │  │booking_id FK   │
│booking_date │   │  │message_text    │
│seat_no      │   │  │notif_type      │
│status       │   │  │sent_timestamp  │
└─────────────┘   │  │is_read         │
       ▲          │  └────────────────┘
       │1         │
       │          │
       │M         │1
       │          │
┌──────┴──────┐  │
│  Payments   │  │
│─────────────│  │
│payment_id PK│  │
│booking_id FK├──┘
│amount       │
│payment_date │
│method       │
│transaction  │
│status       │
└─────────────┘
```

## 🔌 Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Template Engine:** EJS
- **Database:** PostgreSQL
- **Database Driver:** node-postgres (pg)

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (Gradients, Flexbox, Grid)
- **JavaScript** - Form validation

### Development
- **Package Manager:** npm
- **Version Control:** Git

## 🎯 Design Patterns

### MVC Architecture
```
Model (Database)
  ↕
Controller (Business Logic)
  ↕
View (EJS Templates)
```

### Separation of Concerns
- **Routes:** Handle HTTP requests
- **Controllers:** Process business logic
- **Views:** Render user interface
- **Database:** Persist data

### Middleware Stack
```
Request
  ↓
express.static() → Serve static files
  ↓
bodyParser.urlencoded() → Parse form data
  ↓
Route Handlers → Process requests
  ↓
Response
```

## 🔒 Security Considerations

### Current Implementation
- ✅ Parameterized SQL queries (prevents SQL injection)
- ✅ Input validation in forms
- ✅ Foreign key constraints

### Recommended Additions
- ⚠️ User authentication & authorization
- ⚠️ Session management
- ⚠️ CSRF protection
- ⚠️ Rate limiting
- ⚠️ Input sanitization
- ⚠️ HTTPS in production
- ⚠️ Environment variables for secrets

## 📊 Data Flow Examples

### 1. Viewing Payments
```
GET /payments
  → paymentRoutes.js
    → getAllPayments()
      → Query: SELECT payments JOIN bookings
        → Database returns rows
          → Render payments.ejs with data
            → Display in browser
```

### 2. Adding Compartment
```
POST /compartments/add
  → compartmentRoutes.js
    → addCompartment()
      → Extract: train_id, type, capacity
        → Query: INSERT INTO traincompartments
          → Database inserts record
            → Redirect to /compartments
              → Display updated list
```

### 3. Sending Notification
```
POST /notifications/add
  → notificationRoutes.js
    → addNotification()
      → Extract: passenger_id, message, type
        → Query: INSERT INTO notifications
          → Database inserts record
            → Redirect to /notifications
              → Display with unread indicator
```

## 🚀 Scalability Considerations

### Current Architecture
- Single server instance
- Connection pooling for database
- Stateless request handling

### Future Enhancements
- Load balancing
- Database replication
- Caching layer (Redis)
- Message queue for notifications
- Microservices architecture
- API versioning
- WebSocket for real-time updates

## 📈 Performance Optimizations

### Implemented
- ✅ Database connection pooling
- ✅ Indexed foreign keys
- ✅ Efficient SQL queries with JOINs

### Recommended
- Add database query caching
- Implement pagination for large lists
- Optimize images and assets
- Use CDN for static files
- Add compression middleware
- Implement lazy loading

---

**Architecture Version:** 2.0
**Last Updated:** November 2024
