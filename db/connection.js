import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Train_db',
  password: 'shubham',
  port: 5432,
});

export default pool;
