const express = require('express')
const app = express()
const port = 3000


// Add headers for allowing COR while developing
// This is probably only necessary in my local setup
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


const handler = require('./data/handler')
app.get('/data', (req, res) => {
    handler.handle(req.query, (result) => {
        console.log(result)
        res.send(JSON.stringify(result))
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 


/***** FOR TESTING PURPOSES ONLY *****/
/*
const hzp = require('./data/homezone-points')
hzp.getDataAsJSON({zone: 145, day: 5}, (res) => {
    console.log(res)
})
*/
