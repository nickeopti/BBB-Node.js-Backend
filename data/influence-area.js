/**
 * This module returns the sum of the areas of
 * the zones, that people come from into the given zone.
 * In other words, it returns the 'area of influence'
 * that the given zone has
 */

const db = require('../db/postgres')

const queryString = 
    `SELECT SUM(ST_Area(zone.geom::geography)/1000000) as AREA
        FROM mtc_homezone AS hz
        INNER JOIN mtc AS zone
            ON zone.gid = hz.home_hz
        WHERE hz.zone_hz = $1 AND hz.days_hz = $2;`

const altQueryString = 
    `SELECT SUM(AREA) as AREA
        FROM (
            SELECT DISTINCT ON (home_hz)
                    ST_Area(zone.geom::geography)/1000000 as AREA
                FROM mtc_homezone AS hz
                INNER JOIN mtc AS zone
                    ON zone.gid = hz.home_hz
                WHERE hz.zone_hz = $1) s;`;

/**
* Requires the _zone_ and _day_ as query arguments
*/
module.exports = {
    getDataAsJSON: (query, callback) => {
        let sqlQuery = {
            text: query.day === undefined ? altQueryString : queryString,
            values: query.day === undefined ? [query.zone] : [query.zone, query.day]
        }
        db.query(sqlQuery, (err, res) => {
            callback(res.rows[0])
        })
    }
}
