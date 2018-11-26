/**
 * This module works as an intermediary delegate,
 * that delegates routines to the corresponding
 * data-processing modules, that in turn returns
 * the requested data
 */

 /**
  * Add each new data-processing module
  * as a requirement here, and include
  * an entry for it in the dictionay below
  */
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
            handler.getDataAsJSON(query, (result) => {
                callback(result)
            })
        } else {
            callback(undefined)
        }
    }
}
