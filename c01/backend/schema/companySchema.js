const mongoose = require("mongoose");

let CompanySchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
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
    }
})

module.exports = CompanySchemas = mongoose.model("company",CompanySchema);