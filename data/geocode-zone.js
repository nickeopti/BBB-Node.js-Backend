/**
 * This module is still under development,
 * and it is currently NOT working!
 */

const db = require('../db/postgres')
const request = require('request');

const queryString = 
    `SELECT gid AS zone
        FROM mtc 
        WHERE ST_Contains(
            geom,
            ST_SetSRID(ST_MakePoint($1, $2), 4326)
            );`
/*
function prepareData(features) {
    for (const feature of features) {
        let sqlQuery = {
            text: queryString,
            values: feature.center
        }
        const row = (await db.queryAwait(sqlQuery)).rows[0]
        if (row !== undefined)
            feature.zone = row.zone
        console.log(feature.zone)
    }
    console.log('done with for')
    //console.log(features)
    return features
}
*/
module.exports = {
    getDataAsJSON: (query, callback) => {
        request(
                'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(query.place) + '.json?' +
                'access_token=pk.eyJ1Ijoibmlja2VvcHRpIiwiYSI6ImNqb3g5NzE4djFpOGEzcXMzZWJ3dnVqcDYifQ.ZdU0TDhGUUTVHBD44givWw',
                { json: true }, (err, res, body) => {
            if (err) {
                callback(undefined)
            } else {
                //console.log(prepareData(body.features))
                console.log('hello')
                //callback(prepareData(body.features))
            }
        });

        /*
        let sqlQuery = {
            text: queryString,
            values: [query.zone, query.day]
        }

        db.query(sqlQuery, (err, res) => {
            callback(prepareData(res.rows))
        })
        */
        
    }
}
