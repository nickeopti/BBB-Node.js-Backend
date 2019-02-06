/**
 * Module for delivering data regarding which zones,
 * that in a given zone comes from, ie their respective homezones
 * It returns an array of objects, each containing
 * their respective lat and long coordinates as well as
 * the share of people coming from that homezone
 */

const db = require('../db/postgres')

const queryString = 
    `SELECT ST_X(ST_Centroid(z1.geom)) AS lon,
            ST_Y(ST_Centroid(z1.geom)) AS lat,
            hz.fraction AS share,
            z1.area ^ (1.0/2.0) AS size
	    FROM mtc_homezone AS hz
        INNER JOIN mtc AS z1
    	    ON z1.id = hz.homezone
        WHERE hz.zone = $1 AND hz.day = $2;`

/**
* Requires the _zone_ and _day_ as query arguments
*/
module.exports = {
    getDataAsJSON: (query, callback) => {
        let sqlQuery = {
            text: queryString,
            values: [query.zone, query.day]
        }
        db.query(sqlQuery, (err, res) => {
            callback(res.rows)
        })
    }
}
