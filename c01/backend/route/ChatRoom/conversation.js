const router = require("express").Router();
const Conversation = require("../../schema/ChatRoom/Conversation");

// new conv
// need to verify ids
router.post("/", async (req, res) => {
    try {
        const {senderId, receiverId} = req.body;
        const newConversation = new Conversation({
            users: [senderId, receiverId]
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