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
  image: {
    type: String, // Assuming you are storing the image URL
  },
  passwordResetCode: {
    type: String,
    default: "",
  }
},
{ timestamps: true }
);

module.exports = Admin = mongoose.model('Admin', adminSchema);