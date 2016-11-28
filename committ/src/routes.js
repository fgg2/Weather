// "use strict";
const express = require('express');

const router = new express.Router();
const api = require('./api');

let latt = 0;
let long = 0;
let address = '';
let counter = 0;

// database
const pgp = require('pg-promise')();
const xss = require('xss');

const env = process.env.DATABASE_URL;
<<<<<<< HEAD
const DATABASE = 'postgres://test@localhost:5432/WeatherData';

=======
const DATABASE = 'postgres://test@localhost:5432/weatherdata';
>>>>>>> 2afab18370e98c32514393ffb646bec0c0dc405d

const db = pgp(env || DATABASE);


router.get('/list', (req, res) => {
  db.any('select name,COUNT(*) as num from location group by name order by num desc;')
    .then((data) => {
      // Hér ættum við að senda niðurstöður í template og vinna með HTML þar
      const result = ['<ul>'];

      console.log(111, data);

      data.forEach((row) => {
        result.push(`<li><p>${row.name} : ${row.num}</p></li>`);
      });
      result.push('</ul>');

      res.send(result.join('\n'));
    })
    .catch((error) => {
      res.send(`<p>Error selecting data: ${error}</p>`);
    });
});

router.get('/list/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const displayId = xss(req.params.id);

  if (isNaN(id) || id <= 0) {
    res.send(`<p>${displayId} er ekki gilt</p>`);
  }

  db.one('SELECT * FROM location WHERE id = $1', [id])
    .then((data) => {
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
    .catch((error) => {
      res.send(`<p>Gat ekki sótt gögn: ${error}</p>`);
    });
});


// her endar DATABASE

router.get('/data', (req, res) => {
  api.promise(latt, long)
  .then((result) => {
    res.json(result.data);
  })
  .catch((error) => {
    res.render('error', { title: error, error });
  });
});
router.get('/address', (req, res) => {
  address = ({ address });
  res.json(address);
});
router.get('/', (req, res) => {
  const list = [];
  db.any('SELECT name,COUNT(*) as num from location group by name order by num desc LIMIT 5')
     .then((data) => {
       for (let i = 0; i < 5; i += 1) {
         list[i] = data[i].name;
       }
       const list1 = list[0];
       const list2 = list[1];
       const list3 = list[2];
       const list4 = list[3];
       const list5 = list[4];
       counter = 0;
       res.render('index', { list1, list2, list3, list4, list5, counter });
     })
    .catch((error) => {
      res.render('error', { title: error, error });
    });
});

router.post('/', (req, res) => {
  latt = xss(req.body.latt);
  long = xss(req.body.long);
  address = xss(req.body.address);

  db.none('INSERT INTO location (name, latt, long) VALUES ($1, $2, $3)', [address, latt, long])
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
    });

  const list = [];
  const num = [];
  db.any('SELECT name,COUNT(*) AS num FROM location GROUP BY name ORDER BY num DESC LIMIT 5')
    .then((data) => {
      for (let i = 0; i < 5; i += 1) {
        list[i] = data[i].name;
        num[i] = data[i].num;
      }
      const list1 = list[0];
      const list2 = list[1];
      const list3 = list[2];
      const list4 = list[3];
      const list5 = list[4];

      const num1 = num[0];
      const num2 = num[1];
      const num3 = num[2];
      const num4 = num[3];
      const num5 = num[4];
      counter = 1;


      res.render('index', { list1, list2, list3, list4, list5, num1, num2, num3, num4, num5, counter });
    })
      .catch((error) => {
        res.render('error', { title: error, error });
      });
});

module.exports = router;
