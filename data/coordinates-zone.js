/**
 * This module returns the gid of the zone
 * that encapsulates the point given by
 * its lat/lon coordinates
 */

const db = require('../db/postgres')

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
