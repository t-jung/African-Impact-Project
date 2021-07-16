const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
let Partner = require("../schema/partnerSchema");
let Company = require("../schema/companySchema");
const authentication = require("../middleware/partnerAuthentication");
const user_authentication = require("../middleware/userAuthentication");

exports.passwordValidator = () => {
    return [
        check('newPassword','New password should be 6 letters and below 12.').isLength({min:6,max:12})
    ];
}

exports.updateProfileValidator = () => {
    return [
        check('name').notEmpty().withMessage("Name is empty"),
        check('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
        check('company').notEmpty().withMessage("Company field is empty"),
        check('phone_number').notEmpty().withMessage("Phone number is missing").isMobilePhone().withMessage("Invalid phone number"),
        check('address').notEmpty().withMessage("Address is empty"),
        check('fax').optional(),
        check('investing_area').optional()
    ];
}

exports.profileValidator = () => {
    let validator = this.updateProfileValidator().slice();
    validator.push(check('password','Password needs to contains 6 letters and less than 12 letters.').isLength({min:6,max:12}));
    return validator;
}

exports.loginByNameValidator = () => {
    return [
        check('name').notEmpty().withMessage("Name is empty"),
        check('password',"Incorrect password.").isLength({min:6,max:12})
    ];
}

exports.loginByEmailValidator = () => {
    return [
        check('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
        check('password',"Incorrect password.").isLength({min:6,max:12})
    ];
}

router.put("/change_partner_password", authentication, this.passwordValidator(), async(req,res) => {
    try {
        const {newPassword} = req.body;

        let errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(401).json({errors:errors.array()});

        const partner = await Partner.findById(req.partner.id);
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword,salt);
        partner.password = hashedPassword;
        await partner.save();
        res.json("Change password successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error.")
    }
});

router.put("/change_partner_info", authentication, this.updateProfileValidator(), async(req, res) => {
    try {
        let{name,email,address,company,phone_number,fax,investing_area} = req.body;

        let errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

        // find partner
        let partner = await Partner.findById(req.partner.id).select('-password');
        if(!partner) return res.status(404).json("partner not found.");

        // name or email is empty
        if(name === '' || name === null || email === '' || email === null)
            return res.status(401).json("Name or email is empty");

        // find other partner
        let partnerAll = await Partner.find().select('-password');
        let partnerOther = partnerAll.filter(
            (partnerDB) =>
            partnerDB.email !== partner.email,
        );
    
        // check name and email are unique
        let partnerEmailFromDB = await partnerOther.filter(
            (partnerEmailExist) =>
            partnerEmailExist.email === partner.email
        )
        if(partnerEmailFromDB.length !== 0) return res.status(401).json("partner email has already been used.");

        let partnerNameFromDB = await partnerOther.filter(
            (partnerNameExist) =>
            partnerNameExist.name === partner.name
        )
        if(partnerNameFromDB.length !== 0) return res.status(401).json("partner name has already been used.");

        // find other company
        let companyAll = await Company.find().select('-password');
        let companyOther = companyAll.filter(
            (companyDB) =>
            companyDB.email !== company.email,
        );

        let findCompany = await companyOther.filter(
            (companyNameExist) => 
            companyNameExist.name = partner.company
        )
        if (findCompany.length === 0) return res.status(401).json("Company name could not be found");

        // update
        partner.name = name.toString();
        partner.email = email.toString();
        partner.address = address.toString();
        partner.company = company.toString();
        partner.phone_number = phone_number.toString();
        partner.fax = fax.toString();
        partner.investing_area = investing_area.toString();
        await partner.save();
        res.json("Update successfully");        
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error");        
    }
});

router.get("/show_partner_info_id/:partner_id", async(req,res) => {
    try {
        let partnerID = req.params.partner_id;
        let partner = await Partner.findById(partnerID).select('-password');
        res.json(partner);       
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error.");
    }
});

router.get("/show_partner_info_name/:partner_name", async(req,res) => {
    try {
        let name = req.params.partner_name;
        let partner = await Partner.findOne({name:name}).select('-password');
        res.json(partner);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error.");
    }
});

router.get("/show_partner_info_email/:partner_email",
async(req,res)=>{
    try {
        let email = req.params.partner_email;
        let partner = await Partner.findOne({email:email}).select('-password');
        res.json(partner);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error.");
    }
});

router.get("/get_all_partner", async(req,res) => {
    try {
        let partner = await Partner.find();
        res.json(partner);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error.");
    }
});

router.post("/login/partner_name", this.loginByNameValidator(), async(req,res) => {
    try {
        let{name,password} = req.body
    
        let errors = validationResult(req);    
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
   
        // find partner
        let partner = await Partner.findOne({name});
        if(!partner) return res.status(404).json("partner has not been created yet.");

        // verified
        if(partner.status === "unverified")
        return res.status(403).json("Partner hasn't been verified");

        // check password
        let match = await bcryptjs.compare(password,partner.password);
        if(!match) return res.status(401).json("Incorrect password.");
        
        const payload = {
            partner: {
                id: partner._id
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

router.post("/login/partner_email", this.loginByEmailValidator(), async(req,res) => {
    try {
        let{email,password} = req.body
    
        let errors = validationResult(req);    
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
    
        // find partner
        let partner = await Partner.findOne({email});
        if(!partner) return res.status(404).json("partner has not been created yet.")

        // verified
        if(partner.status === "unverified")
        return res.status(403).json("Partner hasn't been verified");

        //check password
        let match = await bcryptjs.compare(password,partner.password);
        if(!match) return res.status(401).json("Incorrect password.");
        
        const payload = {
            partner: {
                id: partner._id
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

router.post("/partner_register", this.profileValidator(), user_authentication, async(req,res) => {
    try {
        let{name,email,password,address,company,phone_number,fax,investing_area} = req.body;

        let errors = validationResult(req);
        if(!errors.isEmpty()) 
            return res.status(400).json({errors: errors.array()});
        
        // check email and name are unique
        let partner = await Partner.findOne({email}).select('-password');
        if(partner)
            return res.status(401).json("partner has already been created.");
        let fetchedpartnerNameFromDB = await Partner.findOne({name}).select('-password');
        if(fetchedpartnerNameFromDB===name)
            return res.status(401).json("partner name has already existed.");

        let companyDB = await Company.findOne({name: company}).select('-password');
        if (!companyDB)
            return res.status(401).json("Could not find company");

        let status = "unverified";
        
        let newPartner = new Partner({
            name,
            user_setup: req.user.id,
            email,
            password,
            address,
            company,
            phone_number,
            fax,
            investing_area,
            status
        });

        // hasd password
        const salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(password,salt);
        newPartner.password = hashedPassword;

        await newPartner.save();

        const payload = {
            partner:{
                id: newPartner._id
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