const mongoose = require("mongoose");

let MessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String,
            require: true
        },
        sender: {
            type: String,
            require: true
        },
        text: {
            type: String
        }
    },
    { timestamps: true }  
);

module.exports = mongoose.model("Message",MessageSchema);
