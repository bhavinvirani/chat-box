const Errors = require('../errors');
const Chat = require('../models/chat.model');

class ChatService {
    async accessChat(payload) {
        try {
            const chat = await Chat.findOne({
                $and: [
                    { users: { $elemMatch: { $eq: payload.sender } } },
                    { users: { $elemMatch: { $eq: payload.recipient } } },
                ],
            })
                .populate('users', '-password')
                .populate('last_message');

            if (chat) {
                return chat;
            } else {
                const chatData = {
                    users: [payload.sender, payload.recipient],
                };
                const chat = await Chat.create({
                    users: [payload.sender, payload.recipient],
                });
                const createdChat = await Chat.findOne({
                    _id: chat._id,
                }).populate('users', '-password');
            }

            return createdChat;
        } catch (error) {
            throw Errors.serverError(error.message);
        }
    }
}

module.exports = new ChatService();
