const db = require('../db/postgres')

const queryString = 
    `SELECT ST_X(ST_Centroid(z1.geom)) AS lon,
            ST_Y(ST_Centroid(z1.geom)) AS lat,
            hz.shared_hz AS share,
            z1.area ^ (1.0/2.0) AS size
	    FROM mtc_homezone AS hz
        INNER JOIN mtc AS z1
    	    ON z1.gid = hz.home_hz
        WHERE hz.zone_hz = $1 AND hz.days_hz = $2;`

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
