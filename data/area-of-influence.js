/**
 * This module returns the sum of the areas of
 * the zones, that people come from into the given zone.
 * In other words, it returns the 'area of influence'
 * that the given zone has
 */

const db = require('../db/postgres')

const queryString = 
`
SELECT
    SUM(ST_Area(zone.geom::geography))/1000000 AS area
FROM mtc_homezone AS hz
INNER JOIN mtc AS zone
    ON zone.id = hz.homezone
WHERE
    hz.zone = $1 AND
    hz.day = $2;
`

const altQueryString = 
`
SELECT
    SUM(AREA)/1000000 AS area
FROM (
    SELECT DISTINCT ON (homezone)
        ST_Area(zone.geom::geography) as AREA
    FROM mtc_homezone AS hz
    INNER JOIN mtc AS zone
        ON zone.id = hz.homezone
    WHERE hz.zone = $1
) s;
`

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
