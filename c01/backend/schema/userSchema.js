const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true, 
    trim: true},
    lastName: { type:String, required: true, trim:true},
    gender: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    status:{
        type: String,
        require: true
    }
    /*
    posts: {
        tags: [{
            type: String
        }]
    },
    followers: {
        tags: [{
            type: String
        }]
    }
*/
});

const User = mongoose.model("User",userSchema);

module.exports = User;