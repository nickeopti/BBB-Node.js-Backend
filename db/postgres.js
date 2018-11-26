/**
 * Module for handling all underlying requests
 * to the PostgreSQL database.
 * Every query to the database ought to be done
 * via the exported query function of this module
 */

const { Pool } = require('pg')

const pool = new Pool({
  user: 'nicke', // The current local Linux-user
  host: '/var/run/postgresql',
  database: 'bbb',
  password: '',
  port: 5432,
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
