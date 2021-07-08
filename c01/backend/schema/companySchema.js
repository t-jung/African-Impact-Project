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
    description:{
        type: String
    },
    status:{
        type: String,
        require: true
    },
    profile_type:{
        type: String,
        default: "company"
    }
})

module.exports = CompanySchemas = mongoose.model("company",CompanySchema);