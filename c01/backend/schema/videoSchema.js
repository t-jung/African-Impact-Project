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
        }],
    comments: [{
            commenter: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            text: {
                type: String,
                required: true,
                default: "This comment is empty!"
            },
            }],
    isAssignment: 
            {type: Boolean
            },
    deliverables:
    [{
        uploader: {
            type: String,
            required: true
        },
        path: {
            type:String,
            required: true
        }
    }]
})

module.exports = video = mongoose.model("Video",videoSchema);
