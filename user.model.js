var mongoose = require('mongoose');
var crypto = require('crypto'); 
var ethCrypto=require('eth-crypto');
var UserSchema = new mongoose.Schema({
  account: String,
  first_name: String,
  last_name: String,
  email: String,
  userType: String,
  qualification: String,
  specialization: String,
  license: Number,
  age: Number,
  blood_group: String,
  hash: String,
  salt: String,
  acl: [],
  updated_date: { type: Date, default: Date.now },
});

UserSchema.methods.setPassword = function(password) { 
     
// Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex'); 
  
    // Hashing user's salt and password with 1000 iterations, 
    // 64 length and sha512 digest 
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, `sha512`).toString(`hex`); 
}; 
   
 // Method to check the entered password is correct or not 
 // valid password method checks whether the user 
 // password is correct or not 
 // It takes the user password from the request  
 // and salt from user database entry 
 // It then hashes user password and salt 
 // then checks if this generated hash is equal 
 // to user's hash in the database or not 
 // If the user's hash is equal to generated hash  
 // then the password is correct otherwise not 
UserSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 

UserSchema.methods.generateKeyPair = function() {
  var identity = ethCrypto.createIdentity();
  console.log("Identity: ", identity);

  var newPublicKey = identity.publicKey;
  console.log("Public key: ", newPublicKey);
  var newCompressed = ethCrypto.publicKey.compress(newPublicKey);
  console.log("Compressed Public key: ", newCompressed);
  var newPrivateKey = identity.privateKey;

  console.log("Private key: ", newPrivateKey);
  
  // Converting private key to string
  var strPKey = newPrivateKey.toString();

  console.log("Private key to String: " ,strPKey);
}

module.exports = mongoose.model('User', UserSchema);