const express = require('express');

const router = new express.Router();
const api = require('./api');
var latt = 0;
var long = 0;



router.get('/data', (req, res) => {
  api.promise(latt,long)
  .then((result) => {
    res.json(result.data);
  })
  .catch((error) => {
    res.render('error', { title: error, error });
  });

});

router.get('/', (req, res) => {
  res.sendfile('index.html');
  //res.render('index');

});

router.post('/', (req, res) => {

  latt = req.body.latt;
  long = req.body.long;

  res.render('index', {title: 'hello'});

});


module.exports = router;
