const mongoose = require("mongoose");

let videoSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    link:{
        type: String,
        require: true
    },
    description:{
        type: String
    },
    likes:{
        type: Number
    },
    uploader: {
        type: String,
        require: true
    },
    uploadDate: {
        type: Date,
        default: Date.now

    },
    tags:
        [{type: String
        }]

})

module.exports = video = mongoose.model("Video",videoSchema);
