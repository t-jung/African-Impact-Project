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
        res.status(500).json("Server error.")
    }
});

router.put("/updateInfo",
authentication,
[
    check('email','E-mail is empty.').isEmail()
],
async(req,res)=>{
    try {
        let{firstName, lastName, gender, phoneNumber, address, email} = req.body;

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
        if(userEmailFromDB.length !== 0) return res.status(401).json("Email already in use.");

        // update
        await User.findOneAndUpdate(req.user.email, req.body, {new: true})
        res.json("Update successfully");        
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error");        
    }
});


router.get("/getUserByEmail/:email",
async(req,res)=>{
    try {
        let email = req.params.email;
        let user = await User.findOne({email:email}).select('-password');
        res.json();
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error.");
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
        res.status(500).json("Server error.");
    }
});

router.get("/login",
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
        if(!user) return res.status(404).json("User does not exist.")

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
        res.status(500).json("Server error.");
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
        newUser.lastName = req.body.lastName;
        newUser.gender = req.body.gender;
        newUser.phoneNumber = req.body.phoneNumber;
        newUser.address = req.body.address;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        
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
        return res.status(500).json("Server error.");
    }
});

router.delete('/delete/:id', (req, res) =>{
    User.findByIdAndRemove(req.params.id, (err, doc) =>
    {
        if(err){
            res.status(404).json('Error: ' + err);
            console.log('Error deleting user' + err);
        } else {
            res.send(doc); 
        }
      
    })
})

module.exports = router;