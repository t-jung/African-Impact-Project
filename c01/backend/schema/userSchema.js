const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true, 
    trim: true},
    middleName: { type:String, trim: true},
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
    description: {
      type: String
    },
    status:{
        type: String,
        required: true
    },
    profile_type:{
      type: String,
      default: "user"
    },
    tags: {
        type: [String]
    },
    userPosts: [{
            posterEmail: {
              type: String,
              required: true
            },
            title: {
                type: String
            },
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
    }],
    following:[
        {
            email:{
                type: String,
                require: true
            }
        }
    ],
    follower:[
        {
            email:{
                type: String,
                require: true
            }
        }
    ],
    notes:[
        {
                type:String
           
        }
    ]
});

const User = mongoose.model("User",userSchema);

module.exports = User;