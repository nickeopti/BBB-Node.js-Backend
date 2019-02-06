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
const homezoneWheel = require('./homezone-wheel')
const zoneAct = require('./zone-act')
const geocodeZone = require('./geocode')
const containingZone = require('./containing-zone')
const zonePerimeter = require('./zone-perimeter')
const areaOfInfluence = require('./area-of-influence')
const mainChartWeek = require('./main-chart-week')
const mainChartDay = require('./main-chart-day')

/**
 * Dictionary of currently available data-handlers
 */
const handlers = {
    'zone-act': zoneAct,
    'homezone-wheel': homezoneWheel,
    'geocode-zone': geocodeZone,
    'containing-zone': containingZone,
    'zone-perimeter': zonePerimeter,
    'influence-area': areaOfInfluence,
    'activity-week': mainChartWeek,
    'activity-day': mainChartDay
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
