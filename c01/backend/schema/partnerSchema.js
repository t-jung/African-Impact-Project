const mongoose = require("mongoose");

let PartnerSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    company:{
        type: String,
        require: true
    },
    phone_number:{
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
    fax:{
        type: String
    },
    investing_area:{
        type: String,
    },
    status:{
        type:String,
        require: true
    }
})

module.exports = PartnerSchema = mongoose.model("partner", PartnerSchema);