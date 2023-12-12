const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // Making email field unique
  phone: String,
  username: String,
  city: String,
  address: String,
  state: String,
  password: String,
  isSuperAdmin: { type: Boolean, default: false },
  isDepartmentAdmin: { type: Boolean, default: false },
  isUser: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;
