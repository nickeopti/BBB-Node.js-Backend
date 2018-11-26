/**
 * Module for delivering data regarding the activity
 * in a given zone throughout one day
 * The returned JSON consists of an array of
 * objects describing the activity each hour
 */

const db = require('../db/postgres')

const queryString = 
    `SELECT count_act AS count,
            density AS density,
            days_act AS day,
            hours_act AS hour
        FROM mtc_activity
        WHERE zone_act = $1 AND days_act = $2;`

function prepareData(rows) {
    var data = []
    rows.forEach(activity => {
        data.push({
            day: activity.day,
            hour: activity.hour,
            count: activity.count,
            density: activity.density
        })
    });
    
    return data
}

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
            callback(prepareData(res.rows))
        })
        
    }
}