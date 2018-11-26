const homezone_wheel = require('./homezone-wheel')
const homezone_points = require('./homezone-points')
const zone_count = require('./zone-count')
const zone_act = require('./zone-act')
const geocode_zone = require('./geocode-zone')

const handlers = {
    'zone-act': zone_act,
    'zone-count': zone_count,
    'homezone-wheel': homezone_wheel,
    'homezone-points': homezone_points,
    'geocode-zone': geocode_zone
}

module.exports = {
    handle: (query, callback) => {
        handler = handlers[query.data]
        
        if (handler !== undefined) {
            handler.getDataAsJSON(query, (result) => {
                callback(result)
            })
        } else {
            callback(undefined)
        }
    }
}
