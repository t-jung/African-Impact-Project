const router = require('express').Router();
let Report = require("../schema/reportsSchema");
const {check,validationResult} = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");



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
    newReport.reported = req.body.reported;
    newReport.reason = req.body.reason;

    console.log(req.body.reporter);
    await newReport.save()
    .then(() => res.json("report Added!"));
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