const mongoose = require("mongoose");

let CompanySchema = mongoose.Schema({
    user_setup:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    phone_number: {
        type: String
    },
    password:{
        type: String,
        require: true
    },
    location:{
        type: String
    },
    industry:{
        type: String
    },
    website:{
        type: String
    },
    startUpDate: {
        type: String
    },
    description:{
        type: String
    },
    tags: {
        type:[String],
        default:[]
    },
    status:{
        type: String,
        require: true
    },
    profile_type:{
        type: String,
        default: "company"
    },
    pitch_decks:{
        type: String,
        default: ""
    },
    financials:{
        type: String,
        default: ""
    },
    MCs:{
        type: String,
        default: ""
    },
    founding_team:{
        type: String,
        default: ""
    }
})

module.exports = CompanySchema = mongoose.model("company",CompanySchema);
