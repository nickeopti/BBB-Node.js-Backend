/**
 * Module for handling all underlying requests
 * to the PostgreSQL database.
 * Every query to the database ought to be done
 * via the exported query function of this module
 */

const fs = require('fs');
const { Pool } = require('pg')

var config = JSON.parse(fs.readFileSync('./db/db-credentials.json', 'utf8'));
const pool = new Pool(config)

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
