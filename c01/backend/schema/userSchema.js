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
    status:{
        type: String,
        require: true
    },
    profile_type:{
      type: String,
      default: "user"
    },
    userPosts: [{
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
    ]
});

const User = mongoose.model("User",userSchema);

module.exports = User;




let PostSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    textOfThePost: {
      type: String,
      required: true,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        name: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
        },
        textOfTheComment: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
        likes: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
            },
          },
        ],
      },
    ],
  });