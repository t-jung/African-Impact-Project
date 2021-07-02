const mongoose = require("mongoose");

let reportSchema = mongoose.Schema({
    reporter:{
        type: String,
        require: true
    },
    reported:{
        type: String,
        require: true
    },
    reason:{
        type: String,
        require: true
    }
})

module.exports = reportSchemas = mongoose.model("report", reportSchema);