const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  image: {},
  status: {
    type: Boolean,
    default: false
  },
},
  { timestamps: true }
);

module.exports = User = mongoose.model('User', userSchema);