const { Pool } = require('pg')

const pool = new Pool({
  user: 'nicke',
  host: '/var/run/postgresql',
  database: 'bbb',
  password: '',
  port: 5432,
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
  queryAwait: (query) => pool.query(query)
}
