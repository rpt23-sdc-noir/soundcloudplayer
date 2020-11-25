const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  database: 'songs'
});

module.exports = pool;