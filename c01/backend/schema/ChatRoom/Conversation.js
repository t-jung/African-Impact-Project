const mongoose = require("mongoose");

let ConversationSchema = new mongoose.Schema(
    {
        users: {
            type: Array
        }
    },
    { timestamps: true }  
);

module.exports = mongoose.model("Conversation",ConversationSchema);
