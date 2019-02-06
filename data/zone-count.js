/**
 * Module for delivering data regarding the activity
 * in a given zone throughout either one week, one day, or one hour
 * The returned JSON consists of a two-dimensional day,
 * where the first index designates the day-of-week,
 * and the second index designates the hour-of-day
 * where the value of that index is an object describing
 * the activity of that particular corresponding hour
 */

const db = require('../db/postgres')

const queryString = 
    `SELECT people AS count,
            density,
            day,
            hour
        FROM mtc_activity
        WHERE zone = $1;`

function prepareData(rows) {
    var days = {}
    rows.forEach(data => {
        if (days[data.day] === undefined)
            days[data.day] = {}
        
        days[data.day][data.hour] = {
            day: data.day,
            hour: data.hour,
            count: data.count,
            density: data.density
        }
    });
    
    return days
}

/**
* Requires the _zone_ and optionally _day_ and _hour_ as query arguments
*/
module.exports = {
    getDataAsJSON: (query, callback) => {
        let sqlQuery = {
            text: queryString,
            values: [query.zone]
        }
        if (query.day !== undefined) {
            sqlQuery.text = sqlQuery.text.replace(';', ' AND days_act = $2;')
            sqlQuery.values.push(query.day)
        }
        if (query.hour !== undefined) {
            sqlQuery.text = sqlQuery.text.replace(';', ' AND hours_act = ' +
                            (query.day !== undefined ? '$3;' : '$2;'))
            sqlQuery.values.push(query.hour)
        }

        db.query(sqlQuery, (err, res) => {
            callback(prepareData(res.rows))
        })
        
    }
}
