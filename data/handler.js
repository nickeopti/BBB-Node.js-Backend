/**
 * This module works as an intermediary delegate,
 * that delegates routines to the corresponding
 * data-processing modules, that in turn returns
 * the requested data
 */

 /**
  * Add each new data-processing module
  * as a requirement here, and include
  * an entry for it in the dictionary below
  */
const homezone_wheel = require('./homezone-wheel')
const homezone_points = require('./homezone-points')
const zone_count = require('./zone-count')
const zone_act = require('./zone-act')
const geocode_zone = require('./geocode')
const containing_zone = require('./containing-zone')
const zone_perimeter = require('./zone-perimeter')
const influence_area = require('./influence-area')
const activity_week = require('./activity-week')
const activity_day = require('./activity-day')

/**
 * Dictionary of currently available data-handlers
 */
const handlers = {
    'zone-act': zone_act,
    'zone-count': zone_count,
    'homezone-wheel': homezone_wheel,
    'homezone-points': homezone_points,
    'geocode-zone': geocode_zone,
    'containing-zone': containing_zone,
    'zone-perimeter': zone_perimeter,
    'influence-area': influence_area,
    'activity-week': activity_week,
    'activity-day': activity_day
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
