const router = require('express').Router();
let Report = require("../schema/reportsSchema");
const {check,validationResult} = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
let Partner = require("../schema/partnerSchema");
let Company = require("../schema/companySchema");
let User = require("../schema/userSchema");



router.get("/",(req, res) => {
    Report.find()
    .then(reports => res.json(reports))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.post("/add",
async(req, res) =>{
    console.log("hello world");
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    var newReport = new Report();
    newReport.reporter = req.body.reporter;
    newReport.reporterType = req.body.reporterType;
    newReport.reported = req.body.reported;
    newReport.reportedType = req.body.reported; 
    newReport.reason = req.body.reason;

    console.log(req.body.reporter);
    await newReport.save()
    .then(() => res.json("report Added!"));
});

router.post("/ban",
async(req, res) =>{
    let type = req.body.reportedType;
    let id = req.body.id;

    if (type === "company"){
        let company = Company.findById(id);
        if(!company) return res.status(404).json("Company does not exist");
        company.status = "banned";
    } else if (type === "user") {
        let user = User.findById(id);
        if(!user) return res.status(404).json("User does not exist");
        user.status = "banned";
    } else if (type === "partner"){
        let partner = Partner.findById(id);
        if(!partner) return res.status(404).json("Partner does not exist");
        partner.status = 'banned';
    } else {
        return res.status(400).json("Incorrect user type");
    }

    res.json('User is now banned');
});

router.delete('/delete/:id', 
async(req, res) =>{
    Report.findByIdAndDelete(req.params.id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
            res.json("report deleted");
        }
    });
});

module.exports = router;