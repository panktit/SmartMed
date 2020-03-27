var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');


// User login api 
router.post('/login', (req, res) => { 
  // Find user with requested email 
  User.findOne({ email : req.body.email }, function(err, user) { 
    if (user === null) { 
      return res.send({ 
        message : "User not found. Please register as a new user"
      }); 
    } 
    else if (user.validPassword(req.body.password)) { 
      return res.json(user); 
    } 
    else { 
      return res.send({
          message : "Incorrect Password"
      }); 
    } 
  }); 
}); 

// User signup api 
router.post('/signup', (req, res, next) => { 
   
// Creating empty user object 
  let newUser = new User(); 

  // Initialize newUser object with request data
  newUser.first_name = req.body.first_name,
  newUser.last_name = req.body.last_name,
  newUser.email = req.body.email,
  newUser.userType = req.body.userType
  
  if(newUser.userType === "doctor") {
    newUser.qualification = req.body.qualification,
    newUser.specialization = req.body.specialization,
    newUser.license = req.body.license
  } else if(newUser.userType === "patient") {
    newUser.age = req.body.age,
    newUser.blood_group = req.body.blood_group,
    newUser.list.push("5e63702f211ade1ab0adb295");
    // newUser.list.push("5e7e3725d0500b0c2c6faef7");
  }
  // Call setPassword function to hash password 
  newUser.setPassword(req.body.password); 
  newUser.generateKeyPair();
  // Save newUser object to database 
  User.create(newUser ,function(err, post) { 
    if (err) return next(err); 
    res.json(post);
  }); 
}); 


/* GET ALL USERS */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});


/* GET ALL PATIENTS */
router.get('/patients', function(req, res, next) {
  User.find({"userType": "patient"},function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET ALL DOCTORS */
router.get('/doctors', function(req, res, next) {
  User.find({"userType": "doctor"},function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// GET ONLY BASIC INFO FOR A DOCTOR
router.get('/doctors/:id', function(req, res, next) {
  User.find({"_id": req.params.id},{first_name: 1, last_name: 1}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE USER BY EMAIL */
// router.get('/:id', function(req, res, next) {
//   User.find({"email": req.params.id}, function (err, user) {
//     if (err) return next(err);
//     res.json(user);
//   });
// });

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