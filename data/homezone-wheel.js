/**
 * Module for handling and delivering the
 * required data, to display the homezone-distance-wheel
 */

const db = require('../db/postgres')

const queryString = 
`
SELECT
    hz.fraction AS fraction,
    ST_Distance(ST_Centroid(z1.geom)::geography, ST_Centroid(z2.geom)::geography) AS distance,
    SUM(act.people) * hz.fraction AS people
FROM mtc_homezone AS hz
INNER JOIN mtc AS z1
    ON z1.id = hz.zone
INNER JOIN mtc AS z2
    ON z2.id = hz.homezone
INNER JOIN mtc_activity AS act
    ON act.zone = hz.zone
    AND act.day = hz.day
WHERE
    hz.zone = $1 AND
    hz.day = $2
GROUP BY hz.id, z1.geom, z2.geom
ORDER BY distance ASC;
`

/**
 * Prepare the data for direct usage by the client-end
 * Groups all the zones into a handful clusters,
 * grouped together by the distance to the respective homezones
 * @param {*} zones The original, non-grouped zones
 * @returns The grouped clusters
 */
function prepareData(zones) {
    if (zones === undefined || zones === null || zones.length === 0)
        return undefined
    
    var currentClusterIndex = 0
    var clusterDistances = [0.00, 0.55, 1.05, 2.05, 5.05, 10, 20]
    var clusters = []
    var accumulatedPercentage = 0
    var accumulatedPeople = 0
    zones.forEach(zone => {
        if (zone.distance !== 0 && zone.distance/1000 >= clusterDistances[currentClusterIndex]) {
            // save the values
            clusters[currentClusterIndex] = {
                percent: accumulatedPercentage,
                distance: Math.max(clusterDistances[currentClusterIndex]*1000-1, 0),
                people: Math.round(accumulatedPeople)
            }

            // reset the values
            currentClusterIndex++
            accumulatedPercentage = zone.fraction
            accumulatedPeople = zone.people
        } else {
            accumulatedPercentage += zone.fraction
            accumulatedPeople += zone.people
        }
    });
    
    let longestDistance = zones[zones.length-1].distance
    let magnitude = Math.pow(10, longestDistance.toFixed(0).length - 1)
    let dist = Math.ceil(2*longestDistance / magnitude) / 2 * magnitude
    clusters[currentClusterIndex] = {
        percent: accumulatedPercentage,
        distance: dist,
        people: Math.round(accumulatedPeople)
    }

    return clusters
}

/**
* Requires the _zone_ and _day_ as query arguments
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
