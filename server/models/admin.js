const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {},
  passwordResetCode: {
    type: String,
    default: "",
  }
},
{ timestamps: true }
);

module.exports = Admin = mongoose.model('Admin', adminSchema);