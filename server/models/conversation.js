const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const conversationSchema = new mongoose.Schema({
    codeRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodeRoom",
        required: true,
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        },
    ],
},
{ timestamps: true }
);

module.exports = Conversation = mongoose.model('Conversation', conversationSchema);
