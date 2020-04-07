var mongoose = require('mongoose');
var crypto = require('crypto'); 
var cryptico = require('cryptico');
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
  publicKey: String,
  privateKey: String,
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
  console.log("Function called!");
  var PassPhrase = "The Moon is a Harsh Mistress."; 
  // The length of the RSA key, in bits.
  var Bits = 1024; 
  
  var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
  var MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey);    
  console.log("RSA Keys : ", MattsPublicKeyString);   
  var PlainText = "Matt, I need you to help me with my Starcraft strategy.";
  
  var EncryptionResult = cryptico.encrypt(PlainText, MattsPublicKeyString);
  console.log("Encryption Result: ", EncryptionResult);
  
  var DecryptionResult = cryptico.decrypt(EncryptionResult.cipher, MattsRSAkey);
  console.log("Decryption Result: ", DecryptionResult.plaintext);
}

module.exports = mongoose.model('User', UserSchema);