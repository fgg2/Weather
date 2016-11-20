const express = require('express');
const fs = require("fs");
const router = new express.Router();
const api = require('./api');
var latt = 0;
var long = 0;
var address = '';



router.get('/data', (req, res) => {
  api.promise(latt,long)
  .then((result) => {
    res.json(result.data);
  })
  .catch((error) => {
    res.render('error', { title: error, error });
  });

});

router.get('/address', (req, res) => {
  address = ({address: address});
  res.json(address);


});

router.get('/', (req, res) => {
  //res.sendfile('index.html');
  res.render('index');

});

router.post('/', (req, res) => {

  latt = req.body.latt;
  long = req.body.long;
  address = req.body.address;

  res.render('index', {title: 'hello'});

});


module.exports = router;
