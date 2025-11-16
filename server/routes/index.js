var express = require('express');
var router = express.Router();
const passport = require('passport');
let DB = require('../config/db');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home',
    displayName: req.user?req.user.displayName:""
   });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home',displayName: req.user?req.user.displayName:"" });
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About us',displayName: req.user?req.user.displayName:"" });
});

/* GET products page. */
router.get('/planner', function(req, res, next) {
  res.render('events', { title: 'Planner',displayName: req.user?req.user.displayName:"" });
});

/* GET home page. */
router.get('/contact', function(req, res, next) {
  res.render('about', { title: 'Contact us',displayName: req.user?req.user.displayName:"" });
});


module.exports = router;