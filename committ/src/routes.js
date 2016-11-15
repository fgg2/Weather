const express = require('express');

const router = new express.Router();
const api = require('./api');


router.get('/data', (req, res) => {
  api.promise()
  .then((result) => {
    res.json(result.data);
  })
  .catch((error) => {
    res.render('error', { title: error, error });
  });

});

router.get('/', (req, res) => {
  res.render('index',{title:'hello'});

});


module.exports = router;
