const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");
const authentication = require("../middleware/userAuthentication");

router.put("/changePassword",authentication,[
    check('newPassword','New password should be 6 letters and below 12.').isLength({min:6,max:12})
],
async(req,res)=>{
    try {
        const {newPassword} = req.body;

        let errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(401).json({errors:errors.array()});

        const user = await User.findById(req.user.id);
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword,salt);
        user.password = hashedPassword;
        await user.save();
        res.json("Change password successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).json("/changePassword Server error.")
    }
});

router.put("/updateInfo",
authentication,
[
    check('email','E-mail is empty.').isEmail()
],
async(req,res)=>{
    try {
        let{firstName,middleName, lastName, gender, phoneNumber, address, email, description, tags} = req.body;

        let errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

        // find user
        let user = await User.findOne(req.user.email);
        if(!user) return res.status(404).json("User does not exist.")

        //Check Email is empty
        if( email === '' || email === null)
            return res.status(401).json("Name/email is empty");

        // find other users
        let userAll = await User.find().select('-password');
        let userOther = userAll.filter(
            (userDB) =>
            userDB.email !== user.email,
        );
    
        // check email are unique
        let userEmailFromDB = await userOther.filter(
            (userEmailExist) =>
            userEmailExist.email === user.email
        )

        if(userEmailFromDB.length !== 0) return res.status(401).json("User email has already been used.");

        user.firstName = firstName.toString();
        user.middleName = middleName.toString();
        user.lastName = lastName.toString();
        user.gender = gender.toString();
        user.phoneNumber = phoneNumber.toString();
        user.address = address.toString();
        user.description = description.toString();
        user.tags = tags.toString();
        await user.save();
        res.json("Update successfully");            
    } catch (error) {
        console.error(error);
        return res.status(500).json("/updateInfo Server error");        
    }
});


router.get("/getUserByEmail/:email",
async(req,res)=>{
    try {
        let email = req.params.email;
        let user = await User.findOne({email:email}).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json("/getUserByEmail/ Server error.");
    }
})
//fetches User by ID
router.get("/getUserById/:id",
async(req,res)=>{
    User.findById(req.params.id, (err, doc) => {
        if(err){
            console.log('404 error user not found in DB' + err);
            return res.status(404).json('Error: ' + err);
        } else {
            res.json(doc);
        }
    })
})

router.get("/admin/getAllUsers",
async(req,res)=>{
    try {
        let user = await User.find();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json("/admin/getAllUsers Server error.");
    }
});

router.post("/login",
[
    check('email',"E-mail is empty.").isEmail(),
],
async(req,res)=>{
    try {
        let{email,password} = req.body
    
        let errors = validationResult(req);    
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
    
        // find user by email
        let user = await User.findOne({email});
        if(!user) return res.status(404).json("User does not exist.");

        // verified
        if(user.status === "unverified")
        return res.status(403).json("User hasn't been verified");

        //check password
        let match = await bcryptjs.compare(password,user.password);
        if(!match) return res.status(401).json("Incorrect password.");
        
        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(
            payload,
            process.env.JSONWEBTOKEN,
            {expiresIn: 3600},
            (err,token) =>{
                if(err) throw err
                res.json({token})
            }
        )

    } catch (error) {
        console.error(error);
        res.status(500).json("/login Server error.");
    }    
});

router.post("/register", 
[
    check('firstName',' First Name is empty.').not().isEmpty(),
    check('lastName',' Last Name is empty.').not().isEmpty(),
    check('email','E-mail is empty.').isEmail(),
    check('password','Password too weak.').isLength({min:6,max:12})
],
async(req,res)=>{
    try {

        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        var newUser = new User();
        newUser.firstName = req.body.firstName;
        newUser.middleName = req.body.middleName;
        newUser.lastName = req.body.lastName;
        newUser.gender = req.body.gender;
        newUser.phoneNumber = req.body.phoneNumber;
        newUser.address = req.body.address;
        newUser.description = req.body.description;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.status = "verified";
        
        // check if user already exists based on email
        let checkUser = await User.findOne({email : newUser.email}).select('-password');
        if(checkUser)
            return res.status(401).json("User using this email already exists.");

        // hashed password
        const salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(newUser.password,salt);
        newUser.password = hashedPassword;

        await newUser.save();

        const payload = {
            user:{
                id: newUser._id
            }
        }

        jwt.sign(
            payload,
            process.env.JSONWEBTOKEN,
            {expiresIn: 3600},
            (err,token) =>{
                if(err) throw err
                res.json({token})
            }
        )
        
    } catch (error) {
        console.error(error);
        return res.status(500).json("/register Server error.");
    }
});

router.delete('/delete/:id', (req, res) =>{
    User.findByIdAndRemove(req.params.id, (err, doc) =>
    {
        if(err){
            res.status(400).json('Error: ' + err);
            console.log('Error deleting user' + err);
        } else {
            res.send(doc); 
        }
      
    })
})

/* Post-Related Endpoints */
// @route POST /createPost
// @desc Creates a post object.
// @access Public
router.post('/createPost', 
[
    check('text',' text is empty.').not().isEmpty(),
    check('email','E-mail is empty.').isEmail()
],
async(req, res) => {
    try {
        // TODO: Should email be the identifying piece of information for a user?
        const {email, text} = req.body;
        /* Error Checking */
        let errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        /* Find user to create Post object under. */
        let poster = await User.findOne({email : req.body.email}).select('-password');
        if(!poster)
            return res.status(401).json("This user is not registered.");
        /* Create post object. */
        var post = {text: req.body.text, posterEmail: req.body.email}; 
        poster.userPosts.unshift(post);
        /* Update database */
        await poster.save();
        res.json("Created post successfully.");

    } catch (error) {
        console.error(error);
        return res.status(500).json("/createPost Server error.");
    }
})

// @route POST /createComment
// @desc Creates a comment object.
// @access Public
router.post('/createComment',
[
    check('text',' text is empty.').not().isEmpty(),
    check('postId','postId is empty.').not().isEmpty(),
    check('email','E-mail is empty.').isEmail()
],
async(req, res) => {
    try{
        let postId = req.body.postId;
        await User.find({}, async(error, users) => {
            if(error) {
                return res.status(400).json("/createComment 400 Server error.");
            }
            await users.map(async user => {
                for(const post of user.userPosts) {
                    let id = JSON.stringify(post._id);
                    if(id === '"' + postId + '"'){
                        var comment = {commenter: req.body.email,
                                       text: req.body.text}
                        post.postComments.unshift(comment);
                        await user.save();
                        return res.json("Comment added successfully.");
                    }
                }
            })
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json("/createComment 500 Server error.");
    }
})
// @route POST /getCommentByPost/:post
// @desc Gets all comments for a given post id.
// @access Public
// TODO: Might have weird async bugs.
router.get('/getCommentByPost/:post',
async(req, res) => {
    try{
        let postId = req.params.post;
        User.find({}, (error, users) => {
            if(error) {
                return res.status(400).json("/getUserByEmail/ Server error.");
            }
            users.map(user => {
                for(const post of user.userPosts) {
                    let id = JSON.stringify(post._id);
                    if(id === '"' + postId + '"'){
                        return res.json(post.postComments);
                    }
                }
            })
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json("/getUserByEmail/ Server error.");
    }
})

// @route POST /getUserPosts
// @desc Gets all posts for a user.
// @access Public
router.get('/getUserPosts/:email',
async(req,res)=>{
    try {
        let {email} = req.params.email;

        let errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

        let user = await User.findOne({email});
        if(!user) return res.status(404).json("User could not found.");

        let userPost = user.userPosts;
        return res.json(userPost);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server error.");        
    }
})

// @route POST /getFollowedPosts
// @desc Creates a all posts for all posts a user follows.
// @access Public
router.get('/getFollowedPosts/:email',
async(req, res) => {
    try{
        console.log("1");
        let email = req.params.email;
        await User.find({}, async(error, users) => {
            if (!error) {
                console.log("2");
                let foo = await users.map(async user => {
                    console.log("3 " +  user.email);
                    for(const f of user.follower) {
                        if (f.email === email) {
                            console.log(user.userPosts);
                            return user.userPosts;
                        }
                    }
                })
                Promise.all(foo).then((values) => {
                    var filtered = values.filter(function(x) {
                        return x !== undefined;
                    })
                    return res.status(200).json(filtered);
                })

            } else {
                return res.status(400).json("/getFollowedPosts Server Error.");
            }
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json("/getFollowedPost Server Error.");
    }
})

router.put('/unfollow', authentication,
[
    check('email',"Email is empty.").isEmail()
],
async(req,res)=>{
    try {
        let {email} = req.body;

        let errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
        
        let user = await User.findById(req.user.id);
        if(!user) return res.status(404).json("User does not exist.");
    
        let follow = await User.findOne({email});
        if(!follow) return res.status(404).json("User does not found.");

        let newfollowing = user.following.filter(
            (following) => following.email !== email
        );
    
        let newfollower = follow.follower.filter(
            (follower) => follower.email !== user.email
        )

        follow.follower = newfollower;
        user.following = newfollowing;
        follow.save();
        user.save();
        
        res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server error.")
    }        
})

router.put('/follow',authentication,
[
    check('email',"Email is empty.").isEmail()
],
async(req,res)=>{
    try {
        let {email} = req.body;

        let errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
        
        let user = await User.findById(req.user.id);
        if(!user) return res.status(404).json("User does not exist.");

        let follow = await User.findOne({email});
        if(!follow) return res.status(404).json("User does not found.");
        
        for(const following_person of user.following){
            if(email === following_person.email){
                return res.status(400).json("User has already followed this person");
            }
        }

        let newFollowing = {
            email
        };

        let newFollower = {
            email:user.email
        };

        follow.follower.unshift(newFollower);
        user.following.unshift(newFollowing);
        follow.save();
        user.save();

        return res.json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json("Server error.");
    }
});

// @route POST /likePost
// @desc The currently logged in user likes a post. Takes in postId, and an email (the liker).
// @access Public
router.post('/likePost',
[
    check('postId','postId is empty.').not().isEmpty(),
    check('email',"Email is empty.").isEmail()
],
async(req, res) => {
    try{
        let postId = req.body.postId;
        await User.find({}, async(error, users) => {
            if(error) {
                return res.status(400).json("/likePost 400 Server error.");
            }
            await users.map(async user => {
                for(const post of user.userPosts) {
                    let id = JSON.stringify(post._id);
                    if(id === '"' + postId + '"'){
                        
                        // Make sure you can't like the same thing.
                        for(const index in post.likes){
                            if(post.likes[index] == req.body.email){
                                return res.json("This has already been liked.");
                            }
                        }

                        post.likes.unshift(req.body.email);
                        await user.save();
                        return res.json("Like added successfully.");
                    }
                }
            })
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json("/likePost 500 Server error.");
    }
})

// @route POST /unlikePost
// @desc The currently logged in user unlikes a post. If the user didn't like it in the first place,
//       do nothing. Takes in postId, and an email (the liker).
// @access Public
router.post('/unlikePost',
[
    check('postId','postId is empty.').not().isEmpty(),
    check('email',"Email is empty.").isEmail()
],
async(req, res) => {
    try{
        let postId = req.body.postId;
        await User.find({}, async(error, users) => {
            if(error) {
                return res.status(400).json("/likePost 400 Server error.");
            }
            await users.map(async user => {
                for(const post of user.userPosts) {
                    let id = JSON.stringify(post._id);
                    if(id === '"' + postId + '"'){
                        for(const index in post.likes) {
                            let liker = post.likes[index]
                            if(liker === req.body.email){
                                post.likes.pull(req.body.email);
                                await user.save();
                                return;
                            }
                        }
                    }
                }
            })
        })
        return res.json("/unlikePost 200.");

    } catch (error) {
        console.error(error);
        return res.status(500).json("/likePost 500 Server error.");
    }
})

// @route POST /getLikes
// @desc Returns a list of people who have liked a post given a postId.
// @access Public
router.get('/getLikes/:postId',
async(req, res) => {
    try{
        let postId = req.params.postId;
        await User.find({}, async(error, users) => {
            if(error) {
                return res.status(400).json("/getLikes Server error.");
            }
            await users.map(user => {
                for(const post of user.userPosts) {
                    let id = JSON.stringify(post._id);
                    if(id === '"' + postId + '"'){
                        return res.json(post.likes);
                    }
                }
            })
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json("/getLikes Server error.");
    }
})






module.exports = router;
