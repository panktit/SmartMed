var express = require('express');
var router = express.Router();
var User = require('./user.model.js');
var encryption = require('./src/components/encryption.js');

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
  
  if(newUser.userType === "doctor") {
    newUser.qualification = req.body.qualification,
    newUser.specialization = req.body.specialization,
    newUser.license = req.body.license
  } else if(newUser.userType === "patient") {
    newUser.age = req.body.age,
    newUser.blood_group = req.body.blood_group

    // aes secret key
    const userdata = encryption.generateSecretKey();
    newUser.iv = userdata.iv.toString('binary');

    // Encrypt the secret key using rsa public key
    console.log("To string secretkey: ", userdata.secretKey.toString('binary'));
    newUser.secretKey = encryption.encryptRSA(userdata.secretKey.toString('binary'), newUser.publicKey);

    console.log("---- TESTING AES ----");
    decryptedKey = encryption.decryptRSA(newUser.secretKey, newUser.privateKey);
    const keybuffer = Buffer.from(decryptedKey, 'binary');
    const iv = Buffer.from(newUser.iv, 'binary')

    const endata = encryption.encryptAES("Pankti Thakkar", keybuffer, iv);
    console.log("Enc data: ",endata);
    console.log("Decrypted: ",encryption.decryptAES(endata.encryptedData, keybuffer, Buffer.from(newUser.iv, 'binary')));
  }
  // Call setPassword function to hash password 
  newUser.setPassword(req.body.password);

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