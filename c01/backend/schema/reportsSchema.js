const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    reporter:{
        type: String,
        require: true
    },
    reporterType:{
        type: String,
        require: true
    },
    reported:{
        type: String,
        require: true
    },
    reportedType:{
        type: String,
        require: true
    },
    reason:{
        type: String,
        require: true
    }
})

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;