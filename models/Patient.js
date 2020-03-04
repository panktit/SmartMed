var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({
  account: String,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  age: Number,
  blood_group: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Patient', PatientSchema);