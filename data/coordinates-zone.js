/**
 * This module is still under development,
 * and it is currently NOT working!
 */

const db = require('../db/postgres')
const request = require('request');

const queryString = 
    `SELECT gid AS zone
        FROM mtc 
        WHERE ST_Contains(
            geom,
            ST_SetSRID(ST_MakePoint($1, $2), 4326)
            );`

module.exports = {
    getDataAsJSON: (query, callback) => {
        let sqlQuery = {
            text: queryString,
            values: [query.lon, query.lat]
        }
        db.query(sqlQuery, (err, res) => {
            callback(res.rows[0])
        })
    }
}
