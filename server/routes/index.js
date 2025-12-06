var express = require('express');
var router = express.Router();
const passport = require('passport');
let DB = require('../config/db');
let User = require('../model/user').User;
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const util = require('util');

/* -------------------- PUBLIC PAGES -------------------- */

router.get('/', function(req, res) {
  res.render('index', { 
    title: 'Home',
    displayName: req.user ? req.user.displayName : ""
  });
});

router.get('/home', function(req, res) {
  res.render('index', { 
    title: 'Home',
    displayName: req.user ? req.user.displayName : "" 
  });
});

router.get('/planner', function(req, res) {
  res.render('events', { 
    title: 'Planner',
    displayName: req.user ? req.user.displayName : "" 
  });
});

router.get('/contact', function(req, res) {
  res.render('about', { 
    title: 'Contact us',
    displayName: req.user ? req.user.displayName : "" 
  });
});


/* -------------------- PASSWORD RESET -------------------- */

// Forgot password modal
router.get('/forgot', (req, res) => {
  res.render('auth/login', { 
    title: 'Login',
    showResetModal: true,
    displayName: ""
  });
});

router.post('/forgot', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.redirect('/forgot');

  const token = crypto.randomBytes(20).toString('hex');

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; 
  await user.save();

  // base URL for hosting
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";
  const link = `${baseUrl}/reset/${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "logbook453@gmail.com",
      pass: "uvkpszixmfzmvixp"  // app password
    }
  });

  await transporter.sendMail({
    to: user.email,
    subject: 'Password Reset',
    text: `Reset your password here: ${link}`
  });

  res.send("Password reset email sent.");
});

// Reset page
router.get('/reset/:token', async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) return res.send("Invalid or expired token");

  res.render('auth/login', {
    title: 'Reset Password',
    token: req.params.token,
    showResetForm: true,
    displayName: ""
  });
});

// Save new password
router.post('/reset/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.send("Token expired or invalid");

    const setPassword = util.promisify(user.setPassword.bind(user));
    await setPassword(req.body.password);

    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    return res.redirect('/login');
  } catch (err) {
    console.error("Password reset error:", err);
    return res.status(500).send("Server error");
  }
});


/* -------------------- LOGIN -------------------- */

router.get('/login', function(req, res) {
  if (!req.user) {
    res.render('auth/login', {
      title: 'Login',
      message: req.flash('loginMessage'),
      displayName: ""
    });
  } else {
    res.redirect("/");
  }
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      req.flash('loginMessage', 'Authentication Error: Invalid username or password');
      return res.redirect('/login');
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect("/events");
    });
  })(req, res, next);
});


/* -------------------- REGISTER -------------------- */

router.get('/register', function(req, res) {
  if (!req.user) {
    res.render('auth/register', {
      title: 'Register',
      message: req.flash('registerMessage')
    });
  } else {
    res.redirect("/events");
  }
});

router.post('/register', function(req, res) {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: inserting user");
      if (err.name == "UserExistsError") {
        req.flash('registerMessage', 'User already exists');
      }
      return res.render('auth/register', {
        title: 'Register',
        message: req.flash('registerMessage'),
        displayName: ""
      });
    }

    return passport.authenticate('local')(req, res, () => {
      res.redirect("/events");
    });
  });
});


/* -------------------- OAUTH -------------------- */

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/events')
);

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/events')
);

router.get('/auth/discord', passport.authenticate('discord'));
router.get('/auth/discord/callback', passport.authenticate('discord', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/events')
);


/* -------------------- LOGOUT -------------------- */

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
});


/* -------------------- EXPORT -------------------- */
module.exports = router;
