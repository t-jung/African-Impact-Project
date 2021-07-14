const mongoose = require("mongoose");

let CompanySchema = mongoose.Schema({
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
        }],
    
    comments: [{
        /* ObjectId represents the commenter. */
        commenter: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true,
            default: "Default Comment Text."
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]

})

module.exports = video = mongoose.model("Video",videoSchema);
