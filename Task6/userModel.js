const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userage: { type: Number, required: true },
  userlocation: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);