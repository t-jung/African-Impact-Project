const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const verificationsSchema = new Schema({
    id:{
        type: String,
        require: true
    },
    userType:{
        type: String,
        require: true
    }
});

const Verification = mongoose.model('Verification', verificationsSchema);

module.exports = Verification;