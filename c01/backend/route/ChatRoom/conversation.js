const router = require("express").Router();
const Conversation = require("../../schema/ChatRoom/Conversation");
let User = require("../../schema/userSchema");

// new conv
router.post("/", async (req, res) => {
    try {
        const {senderId, receiverId} = req.body;
        let users = [senderId, receiverId];

        // sender and receiver cannot be the same person
        if (senderId === receiverId) return res.status(404).json("Sender and Receiver cannot be the same person");

        // check if sender exists
        let senderExists = await User.exists({_id: senderId});
        if(!senderExists) return res.status(404).json("User does not exist.");

        // check if receiver exists
        let receiverExists = await User.exists({_id: receiverId});
        if(!receiverExists) return res.status(404).json("User does not exist.");
        
        let conversationExists = await Conversation.exists({users});
        if (conversationExists) return res.status(404).json("Conversation already exists");

        const newConversation = new Conversation({
            users
        });
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }   
})

// get conv of a user
router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            users: { $in:[req.params.userId]}
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    } 
})

module.exports = router;