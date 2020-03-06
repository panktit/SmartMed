var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');


// User login api 
router.post('/login', (req, res) => { 
  // Find user with requested email 
  console.log(req.body.email);
  console.log(req.body.password);
  User.findOne({ email : req.body.email }, function(err, user) { 
    if (user === null) { 
      return res.status(400).send({ 
        message : "User not found."
      }); 
    } 
    else { 
      if (user.validPassword(req.body.password)) { 
        return res.status(201).send({ 
            message : "User Logged In", 
        }); 
      } 
      else { 
        return res.status(400).send({ 
            message : "Wrong Password"
        }); 
      } 
    } 
  }); 
}); 

// User signup api 
router.post('/signup', (req, res, next) => { 
   
// Creating empty user object 
  let newUser = new User(); 

  // Initialize newUser object with request data 
  newUser.first_name = req.body.first_name, 
  newUser.email = req.body.email 

  // Call setPassword function to hash password 
  newUser.setPassword(req.body.password); 

  // Save newUser object to database 
  newUser.save((err, User) => { 
    if (err) { 
      return res.status(400).send({ 
        message : "Failed to add user."
      }); 
    } 
    else { 
      return res.status(201).send({ 
        message : "User added successfully."
      }); 
    } 
  }); 
}); 


/* GET ALL USERS */
router.get('/', function(req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE USER BY ID */
// router.get('/:id', function(req, res, next) {
//   User.findById(req.params.id, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* GET SINGLE USER BY EMAIL */
router.get('/:id', function(req, res, next) {
  User.find({"email": req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE USER */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE USER */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;