# Weather Wherever

## Lýsing á hvernig á að keyra í localhost
##

1.Þarft að búa til Database með nafninu 'weatherdata', username:postgres port:5432
2.Þarft síðan að keyra eftirfarandi SQL skipun til að búa til töflu
og setja nokkur gögn í töfluna

// SQL skipun
CREATE TABLE location( id serial,
    date timestamp with time zone not null default current_timestamp,
    name varchar(128) not null,
    latt float,
    long float
    );

INSERT INTO location VALUES(1,'2016-11-21 20:33:09+00',	'Vesturbær, Reykjavík, Iceland',-21.955671799999998,64.139495799999992);
INSERT INTO location VALUES(2,'2016-11-21 20:33:12+00',	'Vesturbær, Reykjavík, Iceland',-21.9556434,64.139464500000003);
INSERT INTO location VALUES(3,'2016-11-21 20:33:14+00',	'Vesturbær, Reykjavík, Iceland',-21.9556434,64.139464500000003);
INSERT INTO location VALUES(4,'2016-11-21 20:35:15+00',	'Hjarðarhagi 6, 107 Reykjavík, Iceland',-21.955583799999999,64.139453500000002);
INSERT INTO location VALUES(5,'2016-11-21 20:35:22+00',	'New York, NY, United States',-74.005941300000018,40.712783700000003);
INSERT INTO location VALUES(6,'2016-11-21 23:46:30+00',	'Western Region, Iceland',-21.534129399999998,64.770433999999995);
INSERT INTO location VALUES(7,'2016-11-27 21:23:04+00',	'N Samsen Road Bangkok Thailand',100.51747150000006,13.7886255);
INSERT INTO location VALUES(8,'2016-11-27 21:36:44+00',	'Vesturbær, Reykjavík, Iceland',-21.776595199999999,64.152567699999992);
INSERT INTO location VALUES(9,'2016-11-27 21:36:55+00',	'New York, NY, United States',-21.776591699999997,64.152573899999993);


//hér endar sql skipunin

3.Nú ertu kominn með allt sem þarf til að keyra upp síðuna
4.keyrir "npm install" til að ná í alla pakkanna
5.Notar skipunina "npm run lintcss" til að kanna lint villur í css
6.Notar skipuntina "npm run lint" til að kanna lint villur i js
7.Síðan bara "npm start" til að keyra upp localhost
