var express = require('express');
var router = express.Router();
var User = require('./user.model.js');
var encryption = require('./src/components/encryption.js');
var store = require('./keystore.js');

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
  
  // Generate RSA keys for the new user
  const keys = encryption.generateRSAKeys();
  newUser.publicKey = keys.public
  newUser.privateKey = keys.private
  console.log("After generation: ",newUser);

  // Initialize newUser object with request data
  newUser.first_name = req.body.first_name,
  newUser.last_name = req.body.last_name,
  newUser.email = req.body.email,
  newUser.userType = req.body.userType
  
  req.body.fnameError = "";
  req.body.lnameError = "";
  req.body.emailError = "";
  req.body.ageError = "";
  req.body.passwordLengthError = "";
  req.body.passwordMatchError = "";
  req.body.userTypeError = "";
  
  if(newUser.userType === "doctor") {
    newUser.qualification = req.body.qualification,
    newUser.specialization = req.body.specialization,
    newUser.license = req.body.license
  } else if(newUser.userType === "patient") {
    newUser.age = req.body.age,
    newUser.blood_group = req.body.blood_group

    // aes secret key
    const secretKey = encryption.generateSecretKey();

    // Encrypt the secret key using rsa public key
    console.log("To string secretkey: ", secretKey.toString('binary'));
    encKey = encryption.encryptRSA(secretKey.toString('binary'), newUser.publicKey);
  }
  // Call setPassword function to hash password 
  newUser.setPassword(req.body.password);
  
  validate = (user) => {
    if (!user.first_name) {
      user.fnameError = "First Name cannot be blank";
    }
    if (!user.last_name) {
      user.lnameError = "Last Name cannot be blank";
    }
    if (!user.userType) {
      user.userTypeError = "Please select a user type";
    }
    if (!user.email.includes("@") && !user.email.includes(".")) {
      user.emailError = "Invalid Email";
    }
    if(user.password.length < 8) {
      user.passwordLengthError = "Password should contain atleast 8 characters"
    }
    if(!(user.password === user.cnfpassword)) {
      user.passwordMatchError = "Passwords do not match"
    }
    return user;
  };

  // Save newUser object to database
  const user = validate(req.body);
  if(!(user.fnameError || user.lnameError || user.emailError || user.passwordLengthError || user.passwordMatchError || user.userTypeError)) {
    User.create(newUser ,function(err, post) { 
      if (err) return next(err);
      if(post.userType == "patient") {
        store.storeKey(post._id, encKey);
      }
      res.json(post);
    });
  } else {
    res.status(201).json(user);
  }
}); 


// GET ALL USERS
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});


// GET ALL PATIENTS
router.get('/patients', function(req, res, next) {
  User.find({"userType": "patient"},function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

// GET ALL DOCTORS
router.get('/doctors', function(req, res, next) {
  User.find({"userType": "doctor"},function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

// GET SINGLE USER BY ID 
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// UPDATE USER
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;