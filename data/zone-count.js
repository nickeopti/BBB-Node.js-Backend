const db = require('../db/postgres')

const queryString = 
    `SELECT count_act AS count,
            density AS density,
            days_act AS day,
            hours_act AS hour
        FROM mtc_activity
        WHERE zone_act = $1;`

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
