const newrelic = require('newrelic');
const express = require('express');
const router = express.Router();
const os = require('os');
const https = require('https');
const childProcess = require('child_process');

const users = [
  {'id': 11, 'name': 'Pepe Pecas'},
  {'id': 12, 'name': 'Pancho Papas'},
  {'id': 13, 'name': 'Juana Pecas'},
  {'id': 14, 'name': 'Susana Papas'}
];

function sleep(seconds) {
  childProcess.execSync('sleep ' + seconds);
}

function getRandomTimeout() {
  return parseInt(Math.random() * 5);
}

router.get('/', function(req, res, next) {
  const timeout = getRandomTimeout();
  https.get('https://httpbin.org/delay/' + timeout, (resp) => {
    console.log(resp);
  });
  
  sleep(timeout);
  newrelic.addCustomAttribute('timeout', timeout);
  res.render('users', {
    title: 'Wisely para Nodejs',
    hostname: os.hostname(),
    users: users,
    timeout: timeout
  });
});

router.get('/:id', function(req, res, next) {
  const timeout = getRandomTimeout();
  const userId = req.params.id;
  var user = null;
  users.forEach(function(u) {
    if (u.id == userId) {
      user = u;
    }
  })
  if (user == null) {
    throw new Error('No se encontró el usuario con ID ' + userId);
  }
  sleep(timeout);
  const attributes = {
    timeout: timeout,
    userId: userId,
    userName: user.name
  };
  newrelic.addCustomAttributes(attributes);
  newrelic.recordCustomEvent('UsuarioConsultado', attributes);
  res.json({user: user});
})

module.exports = router;
