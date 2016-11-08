var express = require('express');
var router = express.Router();
'use strict';
const DarkSky = require('dark-sky')
const forecast = new DarkSky('2abde1e13255f72b54fde93723484c16')

/* GET home page. */
router.get('/', function(req, res, next) {

forecast
    .latitude('37.8267')            // required: latitude, string.
    .longitude('-122.423')          // required: longitude, string.
    .time('2016-01-28')             // optional: date, string 'YYYY-MM-DD'.
    .units('si')                    // optional: units, string, refer to API documentation.
    .language('en')                 // optional: language, string, refer to API documentation.
    .exclude('minutely')      // optional: exclude, string, refer to API documentation.
    .extendHourly(true)             // optional: extend, boolean, refer to API documentation.
    .get()                          // execute your get request.
    .then(res => {                  // handle your success response.
        console.log(res)
    })
    .catch(err => {                 // handle your error response.
        console.log(err)
    })
  res.render('index', { title: 'Hello' });
});

module.exports = router;
