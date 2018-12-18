const express = require('express');
const router = express.Router();
const os = require('os');
const https = require('https');


router.get('/', function(req, res, next) {
  const users = [
    {'name': 'Pepe López'},
    {'name': 'Pancho Sánchez'},
    {'name': 'Juana Mireles'},
    {'name': 'Susana Hernández'}
  ];
  
  var timeout = parseInt(Math.random() * 10);
  https.get('https://httpbin.org/delay/' + timeout, (resp) => {
    console.log(resp);
  });
  
  res.render('users', {
    title: 'Wisely para Nodejs',
    hostname: os.hostname(),
    users: users,
    timeout: timeout
  });
});

module.exports = router;
