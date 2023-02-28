const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        text: {
            type: String,
            trim: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        isSend: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;