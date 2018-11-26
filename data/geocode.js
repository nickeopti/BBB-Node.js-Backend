/**
 * This module fetches geocoding from the MapBox API
 * and returns the list of results as a JSON array.
 * Notice that the array includes, among others,
 * the _center_ property with the coordinates of
 * the geocoded point-of-interest
 */

const request = require('request');

module.exports = {
    getDataAsJSON: (query, callback) => {
        request(
                'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(query.place) + '.json?' +
                'access_token=pk.eyJ1Ijoibmlja2VvcHRpIiwiYSI6ImNqb3g5NzE4djFpOGEzcXMzZWJ3dnVqcDYifQ.ZdU0TDhGUUTVHBD44givWw',
                { json: true }, (err, res, body) => {
            if (err) {
                callback(undefined)
            } else {
                callback(body.features)
            }
        });
    }
}
