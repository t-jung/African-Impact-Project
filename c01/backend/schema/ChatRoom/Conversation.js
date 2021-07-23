const mongoose = require("mongoose");

let ConversationSchema = new mongoose.Schema(
    {
        users: {
            type: Array,
            require: true
        }
    },
    { timestamps: true }  
);

module.exports = mongoose.model("Conversation",ConversationSchema);
