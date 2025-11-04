-- SQL Schema for New Tables
-- Run these commands in your PostgreSQL database after creating the existing tables

-- 1. Payments Table
CREATE TABLE IF NOT EXISTS payments (
    payment_id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES booking(booking_id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Cash')),
    transaction_id VARCHAR(100) NOT NULL UNIQUE,
    payment_status VARCHAR(20) NOT NULL CHECK (payment_status IN ('Success', 'Failed', 'Pending')) DEFAULT 'Pending'
);

-- 2. TrainCompartments Table
CREATE TABLE IF NOT EXISTS traincompartments (
    compartment_id SERIAL PRIMARY KEY,
    train_id INTEGER REFERENCES train(train_id) ON DELETE CASCADE,
    compartment_type VARCHAR(50) NOT NULL CHECK (compartment_type IN ('General', 'Sleeper', 'AC 3 Tier', 'AC 2 Tier', 'AC First Class', 'Executive Class')),
    capacity INTEGER NOT NULL CHECK (capacity > 0)
);

-- 3. Seats Table
CREATE TABLE IF NOT EXISTS seats (
    seat_id SERIAL PRIMARY KEY,
    compartment_id INTEGER REFERENCES traincompartments(compartment_id) ON DELETE CASCADE,
    seat_number VARCHAR(10) NOT NULL,
    is_window_seat BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    UNIQUE(compartment_id, seat_number)
);

-- 4. MaintenanceRecords Table
CREATE TABLE IF NOT EXISTS maintenancerecords (
    maintenance_id SERIAL PRIMARY KEY,
    train_id INTEGER REFERENCES train(train_id) ON DELETE CASCADE,
    maintenance_date DATE NOT NULL,
    description_of_work TEXT NOT NULL,
    cost DECIMAL(10, 2) NOT NULL CHECK (cost >= 0),
    performed_by_employee_id VARCHAR(50),
    next_scheduled_maintenance_date DATE
);

-- 5. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    notification_id SERIAL PRIMARY KEY,
    passenger_id INTEGER REFERENCES passenger(passenger_id) ON DELETE CASCADE,
    booking_id INTEGER REFERENCES booking(booking_id) ON DELETE SET NULL,
    message_text TEXT NOT NULL,
    notification_type VARCHAR(30) NOT NULL CHECK (notification_type IN ('SMS', 'Email', 'App Alert', 'Push Notification')),
    sent_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Create indexes for better query performance
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(payment_status);
CREATE INDEX idx_compartments_train ON traincompartments(train_id);
CREATE INDEX idx_seats_compartment ON seats(compartment_id);
CREATE INDEX idx_seats_availability ON seats(is_available);
CREATE INDEX idx_maintenance_train ON maintenancerecords(train_id);
CREATE INDEX idx_maintenance_date ON maintenancerecords(maintenance_date);
CREATE INDEX idx_notifications_passenger ON notifications(passenger_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- Sample data insertion (optional)
-- Uncomment to insert sample data

-- INSERT INTO payments (booking_id, amount, payment_method, transaction_id, payment_status)
-- VALUES (1, 1500.00, 'UPI', 'TXN123456789', 'Success');

-- INSERT INTO traincompartments (train_id, compartment_type, capacity)
-- VALUES (1, 'AC 3 Tier', 72);

-- INSERT INTO seats (compartment_id, seat_number, is_window_seat, is_available)
-- VALUES (1, 'A1', TRUE, TRUE), (1, 'A2', FALSE, TRUE);

-- INSERT INTO maintenancerecords (train_id, maintenance_date, description_of_work, cost, performed_by_employee_id)
-- VALUES (1, '2024-11-01', 'Regular engine maintenance and oil change', 25000.00, 'EMP001');

-- INSERT INTO notifications (passenger_id, booking_id, message_text, notification_type)
-- VALUES (1, 1, 'Your booking has been confirmed. Train departs at 10:00 AM.', 'SMS');
