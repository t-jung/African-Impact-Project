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
    userPosts: {
        post: [{
            tags: [{
                type: String
            }],
            date: {
                type: Date,
                default: Date.now
            },
            text: {
                type: String,
                required: true,
                default: "Default Post Text."
            },
            likes: [{
                /* This should be the identifying piece of information for a user. */
                type: String
            }],
            postComments: [{
                commenter: {
                    /* This should be the identifying piece of information for a user. */
                    type: String,
                    required: true
                },
                text: {
                    type: String,
                    required: true,
                    default: "Default Comment Text."
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }],
        }]
    }
    /*
    followers: {
        tags: [{
            type: String
        }]
    */
});

const User = mongoose.model("User",userSchema);

module.exports = User;