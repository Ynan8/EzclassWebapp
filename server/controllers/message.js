const Conversation = require("../models/conversation");
const Message = require("../models/message");

exports.sendMessage = async (req, res) => {
    try {
        const { message, codeRoomId } = req.body;
      
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            codeRoom: codeRoomId,
        });

        if (!conversation) {
            conversation = await Conversation.create({
                codeRoom: codeRoomId,
            });
        }

        const newMessage = new Message({
            senderId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // SOCKET IO FUNCTIONALITY WILL GO HERE

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error send message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getMessages = async (req, res) => {
    try {
        const { codeRoomId } = req.params;
        const conversation = await Conversation.findOne({ codeRoom: codeRoomId })
            .populate('messages');

        if (!conversation) {
            return res.status(404).json({ message: 'No conversation found for this code room.' });
        }

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};