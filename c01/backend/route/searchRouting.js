const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
let Company = require("../schema/companySchema");
let Partner = require("../schema/partnerSchema");
let User = require("../schema/userSchema");
const company_authentication = require("../middleware/companyAuthentication");
const user_authentication = require("../middleware/userAuthentication");
const partner_authentication = require("../middleware/partnerAuthentication");

router.get("/all_result",
async(req,res)=>{
    try {
        let user = await User.find().select('-password');
        let company = await Company.find().select('-password');
        let partner = await Partner.find().select('-password');

        let all = user.concat(partner).concat(company);
        res.json(all);

    } catch (error) {
        console.error(error);
        res.status(500).json("Server error.");        
    }
});

router.get("/:search_key",
async(req,res)=>{
    try {

        let searchKey = req.params.search_key;
        let user = await User.find().select('-password');
        let company = await Company.find().select('-password');
        let partner = await Partner.find().select('-password');

        var str = ".*" + searchKey + ".*$";
        var reg = new RegExp(str);
        
        let companyFromDB = await Company.find({"name":{$regex:reg,$options: 'i'}});
        let partnerFromDB = await Partner.find({"name":{$regex:reg,$options: 'i'}});
        let userFromDB = await User.find({$or:[
            {"firstName":{$regex:reg,$options: 'i'}},
            {"lastName":{$regex:reg,$options: 'i'}}
        ]});
        
        let result = companyFromDB.concat(partnerFromDB).concat(userFromDB);
    
        if(result.length === 0){
            let all = user.concat(partner).concat(company);
            res.json(all);
        }
        else{
            res.json(result);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json("Server error.");        
    }
});

module.exports = router;