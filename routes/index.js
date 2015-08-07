var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.get('/logout', function(req, res) { 
    req.logout();
    //res.send("logged out", 401);
    res.redirect('/');
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { error:err });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {

    if(err){
        res.send(500, err);
    }
    if(!user){
        res.render('login', {error:info.message});
    }
    if(user){
        req.logIn(user, function(err) {
          if (err) { res.send(500); }
          else {return res.redirect('/');} 
        });
    }

}) (req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;