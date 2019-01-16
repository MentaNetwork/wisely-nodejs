const express = require('express');
const router = express.Router();
const os = require('os');

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Wisely para Nodejs',
    hostname: os.hostname()
  });
});

router.get('/error', function(req, res, next) {
  throw new Error('Esto es un error intencional de ejemplo');
});

module.exports = router;
