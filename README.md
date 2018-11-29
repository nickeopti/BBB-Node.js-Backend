# Experimental Backend for BBB
Experimental implementation of a simple, lightweight and easily extendable modular backend for BBB.

## Purpose
To handle requests for processed data from our geospatial PostgreSQL database.

## Structure
The `app.js` entrypoint delegates all GET requests for processed data to the `data/handler.js` module. This module handles each request by delegating the task to the corresponding module in `data/`.

Each `data/` module makes request to the database via the `db/postgres.js` module, then processes it and finally returns the processed data via a callback.
The data is transferred to the requesting client as a JSON response.

To implement additional functionality and features; simply create a new module, and `require` and reference it in the dictionary in `data/handler.js`.

Have a look at the different modules in `data/` for examples and inspiration. Furthermore, have a look at the [BBB-Data-UI](https://github.com/nickeopti/BBB-Data-UI) repository for examples of client-side usage of this backend via AJAX.

## GET requests
The general syntax for GET requests is `{server}/data?data={handler}&{queryparameters}`, for instance
```
http://localhost:3000/data?data=coordinates-zone&lon=11.553534&lat=48.131089
http://localhost:3000/data?data=zone-perimeter&zone=145
http://localhost:3000/data?data=geocode-zone&place=bavariaring
http://localhost:3000/data?data=homezone-points&zone=145&day=5
http://localhost:3000/data?data=homezone-wheel&zone=145&day=5
```
where these examples for the sake of preliminary testing are running on `localhost`.
