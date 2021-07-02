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
    userPosts: [{
        post: {
            title: {
                type: String
            },
            postId: Number,
            tags: [{
                type: String
            }],
            date: {
                type: Date,
                default: Date.now
            },
            text: {
                type: String,
                default: "This post is empty!"
            },
            likes: [{
                /* ObjectId represents the liker. */
                type: String,
                required: true
            }],
            postComments: [{
                /* ObjectId represents the commenter. */
                commenter: {
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
        }
    }]
    /*
    followers: {
        tags: [{
            type: String
        }]
    */
});

const User = mongoose.model("User",userSchema);

module.exports = User;