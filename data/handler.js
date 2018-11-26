const homezone_wheel = require('./homezone-wheel')
const homezone_points = require('./homezone-points')
const zone_count = require('./zone-count')
const zone_act = require('./zone-act')
const geocode_zone = require('./geocode')
const coordinates_zone = require('./coordinates-zone')
const zone_perimeter = require('./zone-perimeter')

/**
 * Dictionary of currently available data-handlers
 */
const handlers = {
    'zone-act': zone_act,
    'zone-count': zone_count,
    'homezone-wheel': homezone_wheel,
    'homezone-points': homezone_points,
    'geocode-zone': geocode_zone,
    'coordinates-zone': coordinates_zone,
    'zone-perimeter': zone_perimeter
}

module.exports = {
    handle: (query, callback) => {
        handler = handlers[query.data]
        
        if (handler !== undefined) {
            // Get the specific data-handler to handle the GET request
            handler.getDataAsJSON(query, (result) => {
                callback(result)
            })
        } else {
            callback(undefined)
        }
    }
}