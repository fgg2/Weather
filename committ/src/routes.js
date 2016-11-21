const express = require('express');
const fs = require("fs");
const router = new express.Router();
const api = require('./api');
var latt = 0;
var long = 0;
var address = '';

//database
const pgp = require('pg-promise')();
const xss = require('xss');

const DATABASE = process.env.DATABASE_URL || 'postgres://postgres@localhost/WeatherData';
const db = pgp(DATABASE);


router.get('/list', (req, res) => {
  db.any(`SELECT * FROM location LIMIT 10 OFFSET 0`)
    .then(data => {
      // Hér ættum við að senda niðurstöður í template og vinna með HTML þar
      const result = [`<ul>`];

      data.forEach(row => {
        result.push(`<li><a href="/list/${row.id}">${row.name}</a></li>`);
      })
      result.push('</ul>');

      res.send(result.join('\n'));
    })
    .catch(error => {
      res.send(`<p>Error selecting data: ${error}</p>`);
    });
});

router.get('/list/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const displayId = xss(req.params.id);

  if (isNaN(id) || id <= 0) {
    res.send(`<p>${displayId} er ekki gilt</p>`)
  }

  db.one(`SELECT * FROM location WHERE id = $1`, [id])
    .then(data => {
      res.send(`<dl>
  <dt>Nafn</dt>
  <dd>${data.name}</dd>
  <dt>latt</dt>
  <dd>${data.latt}</dd>
  <dt>long</dt>
  <dd>${data.long}</dd>
  <dt>Date</dt>
  <dd>${data.date}</dd>
</dl>`);
    })
    .catch(error => {
      res.send(`<p>Gat ekki sótt gögn: ${error}</p>`);
    });
});



//her endar DATABASE

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

  latt = xss(req.body.latt);
  long = xss(req.body.long);
  address = xss(req.body.address);

  db.none(`INSERT INTO location (name,latt, long) VALUES ($1, $2, $3)`, [address,latt, long])
    .then(data => {
      res.render('index', {title: 'hello'});
    })
    .catch(error => {
      res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
    });



});


module.exports = router;
