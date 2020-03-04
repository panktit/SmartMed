var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  account: String,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  userType: String,
  qualification: String,
  specialization: String,
  license: Number,
  age: Number,
  blood_group: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);