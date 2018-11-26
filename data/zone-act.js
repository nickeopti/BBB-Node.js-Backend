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
