/**
 * Module for delivering data regarding the activity
 * in a given zone throughout one day.
 * The returned JSON conforms with Maxi's
 * implementation of the daily chart
 */

const db = require('../db/postgres')

const queryString = 
    `SELECT day,
            hour,
            people AS count,
            density
        FROM mtc_activity
        WHERE zone = $1 AND day = $2
        ORDER BY hour;`

const days = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday'
}

function prepareData(rows) {
    var data = {
        series: {
            serie0: {}
        },
        labels: {},
        title: {
            0: days[rows[0].day]
        }
    }
    for (let i = 0; i < 24; i++)
        data.labels[i] = i
    rows.forEach(activity => {
        data.series.serie0[activity.hour] = activity.count
    })
    
    return data
}

/**
* Requires the _zone_ as query argument
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
