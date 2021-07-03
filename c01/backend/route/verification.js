const router = require('express').Router();
let Report = require("../schema/reportsSchema");
const {check,validationResult} = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
let Partner = require("../schema/partnerSchema");
let Company = require("../schema/companySchema");
let User = require("../schema/userSchema");
let Verification = require("../schema/verificationsSchema");

router.get("/",(req, res) => {
    Verification.find()
    .then(verifications => res.json(verifications))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/:id",(req, res) => {
    Verification.findById(req.params.id)
    .then(verifications => res.json(verifications))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/add",
async(req, res) =>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    var newVerification = new Verification();
    newVerification.id = req.body.id;
    newVerification.userType = req.body.userType;

    await newVerification.save()
    .then(() => res.json("verification request Added!"));
});

router.post("/verifyUser",
async(req, res) =>{
    let type = req.body.reportedType;
    let id = req.body.id;

    if (type === "company"){
        let company = await Company.findById(id);
        if(!company) return res.status(404).json("Company does not exist");
        company.status = "verified";
    } else if (type === "user") {
        let user = await User.findById(id);
        if(!user) return res.status(404).json("User does not exist");
        user.status = "verified";
    } else if (type === "partner"){
        let partner = await Partner.findById(id);
        if(!partner) return res.status(404).json("Partner does not exist");
        partner.status = 'verified';
    } else {
        return res.status(400).json("Incorrect user type");
    }
    res.json("User is now verified");
});

router.delete('/delete/:id', 
async(req, res) =>{
    Verification.findByIdAndDelete(req.params.id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
            res.json("Verification request deleted");
        }
    });
});

module.exports = router;