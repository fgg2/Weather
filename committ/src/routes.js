"use strict";
const express = require('express');
const fs = require("fs");
const router = new express.Router();
const api = require('./api');
var latt = 0;
var long = 0;
var address = '';
var counter = 0;

//database
const pgp = require('pg-promise')();
const xss = require('xss');

const env = process.env.DATABASE_URL;
const DATABASE = 'postgres://test@localhost:5432/WeatherData';
const db = pgp(env || DATABASE);


router.get('/list', (req, res) => {
  db.any(`select name,COUNT(*) as num from location group by name order by num desc;`)
    .then(data => {
      // Hér ættum við að senda niðurstöður í template og vinna með HTML þar
      const result = [`<ul>`];

      data.forEach(row => {
        result.push(`<li><p>${row.name} : ${row.num}</p></li>`);
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
  const list = [];
/*
  db.any('SELECT name,COUNT(*) as num from location group by name order by num desc LIMIT 5')
    .then(data => {
      for(var i = 0;i<5;i++){
        list[i]= data[i].name;

      }
      let list1 = list[0];
      let list2 = list[1];
      let list3 = list[2];
      let list4 = list[3];
      let list5 = list[4];

      counter = 0;
      console.log(counter);
      res.render('index', {list1,list2,list3,list4,list5,counter} );
    })
    .catch(error => {
      console.log(error);
    });*/
    res.render('index');

});

router.post('/', (req, res) => {

  latt = xss(req.body.latt);
  long = xss(req.body.long);
  address = xss(req.body.address);

  db.none(`INSERT INTO location (name,latt, long) VALUES ($1, $2, $3)`, [address,latt, long])
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
    });

    const list = [];
    const num = [];

    db.any('SELECT name,COUNT(*) AS num FROM location GROUP BY name ORDER BY num DESC LIMIT 5')
      .then(data => {
        for(var i = 0;i<5;i++){
          list[i]= data[i].name;
          num[i]= data[i].num;
        }
        let list1 = list[0];
        let list2 = list[1];
        let list3 = list[2];
        let list4 = list[3];
        let list5 = list[4];

        let num1 = num[0];
        let num2 = num[1];
        let num3 = num[2];
        let num4 = num[3];
        let num5 = num[4];
        counter = 1;
        console.log(counter);

        res.render('index', {list1,list2,list3,list4,list5,num1,num2,num3,num4,num5,counter} );
      })
      .catch(error => {
        console.log(error);
      });



});


module.exports = router;
