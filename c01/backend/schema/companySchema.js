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
    },
    status:{
        type: String,
        require: true
    }
})

module.exports = CompanySchema = mongoose.model("company",CompanySchema);