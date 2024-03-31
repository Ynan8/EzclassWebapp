const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
},
{ timestamps: true }
);

module.exports = Message = mongoose.model('Message', messageSchema);
