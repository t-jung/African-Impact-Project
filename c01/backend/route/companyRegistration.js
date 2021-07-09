const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
let Company = require("../schema/companySchema");
const authentication = require("../middleware/companyAuthentication");
const user_authentication = require("../middleware/userAuthentication");

router.put("/change_company_password",
authentication,
[
    check('newPassword','New password should be 6 letters and below 12.').isLength({min:6,max:12})
],
async(req,res)=>{
    try {
        const {newPassword} = req.body;

        let errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(401).json({errors:errors.array()});

        const company = await Company.findById(req.company.id);
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword,salt);
        company.password = hashedPassword;
        await company.save();
        res.json("Change password successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error.")
    }
});

router.put("/change_company_info",
authentication,
[
    check('name','Company name is empty.').not().isEmpty(),
    check('email','E-mail is empty.').isEmail()
],
async(req,res)=>{
    try {
        let{name,email,location,industry,website,description} = req.body;

        let errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

        // find company
        let company = await Company.findById(req.company.id).select('-password');
        if(!company) return res.status(404).json("Company not found.");

        // name or email is empty
        if(name === '' || name === null || email === '' || email === null)
            return res.status(401).json("Company name or email is empty");

        // find other company
        let companyAll = await Company.find().select('-password');
        let companyOther = companyAll.filter(
            (companyDB) =>
            companyDB.email !== company.email,
        );
    
        // check name and email are unique
        let companyEmailFromDB = await companyOther.filter(
            (companyEmailExist) =>
            companyEmailExist.email === company.email
        )
        if(companyEmailFromDB.length !== 0) return res.status(401).json("Company name has already been used.");

        let companyNameFromDB = await companyOther.filter(
            (companyNameExist) =>
            companyNameExist.name === company.name
        )
        if(companyNameFromDB.length !== 0) return res.status(401).json("Company email has already been used.");

        // update
        company.name = name.toString();
        company.email = email.toString();
        company.location = location.toString();
        company.industry = industry.toString();
        company.website = website.toString();
        company.description = description.toString();
        await company.save();
        res.json("Update successfully");        
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error");        
    }
});

router.get("/show_company_info_id/:company_id",
async(req,res)=>{
    try {
        let companyID = req.params.company_id;
        let company = await Company.findById(companyID).select('-password');
        return res.json(company);       
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error.");
    }
});

router.get("/show_company_info_name/:company_name",
async(req,res)=>{
    try {
        let name = req.params.company_name;
        let company = await Company.findOne({name:name}).select('-password');
        return res.json(company);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error.");
    }
})

router.get("/get_all_company",
async(req,res)=>{
    try {
        let company = await Company.find();
        res.json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error.");
    }
});

router.post("/login/company_name",
[
    check('name',"Company name is empty."),
    check('password',"Incorrect password.").isLength({min:6,max:12})
],
async(req,res)=>{
    try {
        let{name,password} = req.body
    
        let errors = validationResult(req);    
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
   
        // find company
        let company = await Company.findOne({name});
        if(!company) return res.status(404).json("Company has not been created yet.");
        
        // verified
        if(company.status === "unverified")
        return res.status(400).json("Company hasn't been verified");

        // check password
        let match = await bcryptjs.compare(password,company.password);
        if(!match) return res.status(401).json("Incorre password.");
        
        const payload = {
            company: {
                id: company._id
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

router.post("/login/company_email",
[
    check('email',"E-mail is empty.").isEmail(),
    check('password',"Incorrect password.").isLength({min:6,max:12})
],
async(req,res)=>{
    try {
        let{email,password} = req.body
    
        let errors = validationResult(req);    
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
    
        // find company
        let company = await Company.findOne({email});
        if(!company) return res.status(404).json("Company has not been created yet.");

        // verified
        if(company.status === "unverified")
        return res.status(403).json("Company hasn't been verified");

        //check password
        let match = await bcryptjs.compare(password,company.password);
        if(!match) return res.status(401).json("Incorre password.");

        const payload = {
            company: {
                id: company._id
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

router.post("/company_register", 
user_authentication,
[
    check('name','Company name is empty.').not().isEmpty(),
    check('email','E-mail is empty.').isEmail(),
    check('password','Password needs to contains 6 letters and less than 12 letters.').isLength({min:6,max:12})
],
async(req,res)=>{
    try {
        let{name,email,password,location,industry,website,description} = req.body;

        let errors = validationResult(req);
        if(!errors.isEmpty()) 
            return res.status(400).json({errors: errors.array()});
        
        // check email and name are unique
        let company = await Company.findOne({email}).select('-password');
        if(company)
            return res.status(403).json("Company has already been created.");
        let fetchedCompanyNameFromDB = await Company.findOne({name}).select('-password');
        if(fetchedCompanyNameFromDB===name)
            return res.status(401).json("Company name has already existed.");

        let status = "unverified";
        
        let newCompany = new Company({
            name,
            user_setup: req.user.id,
            email,
            password,
            location,
            industry,
            website,
            description,
            status
        });

        // hasd password
        const salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(password,salt);
        newCompany.password = hashedPassword;

        await newCompany.save();

        const payload = {
            company:{
                id: newCompany._id
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

module.exports = router;