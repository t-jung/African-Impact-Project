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
        }]

})

module.exports = video = mongoose.model("Video",videoSchema);
