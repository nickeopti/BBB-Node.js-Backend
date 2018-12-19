/**
 * Module for delivering data regarding the activity
 * in a given zone throughout one day
 * The returned JSON consists of an array of
 * objects describing the activity each hour
 */

const db = require('../db/postgres')

const queryString = 
    `SELECT days_act AS day,
            hours_act AS hour,
            count_act::integer AS count,
            density::real AS density
        FROM mtc_activity
        WHERE zone_act = $1
        ORDER BY day, hour;`

function prepareData(rows) {
    var data = {
        series: {},
        labels: {
            0: 'Monday',
            1: 'Tuesday',
            2: 'Wednesday',
            3: 'Thursday',
            4: 'Friday',
            5: 'Saturday',
            6: 'Sunday'
        }
    }
    rows.forEach(activity => {
        let serie = 'serie' + (activity.hour)
        if (data.series[serie] === undefined)
            data.series[serie] = {}
        data.series[serie][activity.day-1] = activity.count
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
            values: [query.zone]
        }

        db.query(sqlQuery, (err, res) => {
            callback(prepareData(res.rows))
        })
    }
}
