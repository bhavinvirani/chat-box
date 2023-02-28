const Errors = require('../errors');
const ChatService = require('../services/chatService');
const HTTP_STATUS = require('../constants/httpStatusCode');

// Find or Create a new chat
const accessChat = async (req, res, next) => {
    const payload = {
        sender: res.locals.userId,
        recipient: req.body.recipientId,
    }
    try {
        const response = await ChatService.accessChat(payload);
        res.status(HTTP_STATUS.CREATED).json({
            status: true,
            message: 'Chat created successfully',
            data: response,
        });
    } catch (error) {
        next(error);
    }
}
module.exports = { accessChat };
