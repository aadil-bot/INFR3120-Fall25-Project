var express = require('express');
var router = express.Router();
const passport = require('passport');
let DB = require('../config/db');
let User = require('../model/user').User;


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



/* GET products page. */
router.get('/planner', function(req, res, next) {
  res.render('events', { title: 'Planner',displayName: req.user?req.user.displayName:"" });
});

/* GET home page. */
router.get('/contact', function(req, res, next) {
  res.render('about', { title: 'Contact us',displayName: req.user?req.user.displayName:"" });
});


module.exports = router;



// Get method for login
router.get('/login', function(req,res,next){
  if(!req.user)
  {
    res.render('auth/login',
      {
      title:'Login',
      message: req.flash('loginMessage'),
      displayName: ""
      }

    )
  }
  else
  {
    return res.redirect("/")
  }
});

// Post method for login
router.post('/login', function(req, res, next){
  passport.authenticate('local', (err, user, info) => {
    if(err)
    {
      return next(err);
    }
    if(!user)
    {
      req.flash('loginMessage', 'Authentication Error: Invalid username or password');
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      if(err)
      {
        return next(err);
      }
      return res.redirect("/events");
    });
  })(req, res, next);
});

// Get method for register
router.get('/register', function(req,res,next){
  if(!req.user)
  {
    res.render('auth/register',
      {
      title:'Register',
      message: req.flash('registerMessage')
      }

    )
  }
  else
  {
    return res.redirect("/events")
  }
});

// Post method for register
router.post('/register', function(req,res,next){
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });
  
  User.register(newUser, req.body.password, (err) => {
    if(err)
    {
      console.log("Error: Inserting the new user");
      if(err.name == "UserExistsError")
      {
        req.flash('registerMessage', 'Registration Error: User already exists');
      }
      return res.render('auth/register',
        {
          title: 'Register',
          message: req.flash('registerMessage'),
          displayName: ""
        }
      );
    }
    else {
      // Authenticate after successful registration
      return passport.authenticate('local')(req, res, () => {
        res.redirect("/events");
      });
    }
  });
});

/* GET logout processing */
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.redirect('/');
  });
});