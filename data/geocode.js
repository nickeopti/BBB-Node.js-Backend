/**
 * This module is still under development,
 * and it is currently NOT working!
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
