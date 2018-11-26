/**
 * This module returns the (four) points,
 * that establish the corners of the given zone
 */

const db = require('../db/postgres')

const queryString = 
    `SELECT ST_X(point) AS lon,
            ST_Y(point) AS lat
        FROM 
            (SELECT (ST_Dump(ST_RemoveRepeatedPoints(ST_Points(geom)))).geom AS point
                FROM mtc
                WHERE gid = $1) s;`

/**
* Requires the _zone_ as query argument
*/
module.exports = {
    getDataAsJSON: (query, callback) => {
        let sqlQuery = {
            text: queryString,
            values: [query.zone]
        }
        db.query(sqlQuery, (err, res) => {
            callback(res.rows)
        })
    }
}
