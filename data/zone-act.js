/**
 * Module for delivering data regarding the activity
 * in a given zone throughout each day of the week.
 * The returned JSON consists of an object
 * with keys for each day that holds an array of
 * objects describing the activity each hour
 */

const db = require('../db/postgres')

const queryString = 
    `SELECT day,
            hour,
            people AS count,
            density
        FROM mtc_activity
        WHERE zone = $1 AND day = $2
        ORDER BY day, hour;`

const altQueryString = 
    `SELECT day,
            hour,
            people AS count,
            density
        FROM mtc_activity
        WHERE zone = $1
        ORDER BY day, hour;`

function prepareData(rows) {
    var data = {}
    rows.forEach(activity => {
        if (data[activity.day] === undefined)
            data[activity.day] = []
        data[activity.day].push(activity)

        if (activity.hour === 23) {
            let act = Object.assign({}, data[activity.day][0])
            act.hour = 24
            data[activity.day].push(act)
        }
    })
    
    return data
}

/**
* Requires the _zone_ and optionally _day_ as query arguments
*/
module.exports = {
    getDataAsJSON: (query, callback) => {
        let sqlQuery = {
            text: query.day === undefined ? altQueryString : queryString,
            values: query.day === undefined ? [query.zone] : [query.zone, query.day]
        }

        db.query(sqlQuery, (err, res) => {
            callback(prepareData(res.rows))
        })
    }
}
