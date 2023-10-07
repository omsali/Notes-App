const express = require('express');
const router = express.Router();
const User = require('../models/User');      
const { body, validationResult } = require('express-validator')   
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")

const JWT_SEC = "zxcgvbnm";
 
//ROUTE : 1  create user using : POST "/api/auth/createuser". no logiin required
router.post('/createuser', [
    body('name', 'Name should be minimum two character').isLength({min: 2}),
    body('email', 'Enter a valid email').isEmail(),
    body('password','passwordshould be minimum 5 character').isLength({min : 5}),
], async (req , res)=>{
    // checks for error if any returns a bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
    //checking wheather a user with this email already exists
    let user = await User.findOne({email: req.body.email});     //await till it resolves
    if(user){
        return res.status(400).json({email: "Email already exists"});
    }

    const salt = await bcrypt.genSalt(10);                          //creting the salt
    const secPass = await bcrypt.hash(req.body.password, salt);     //hashing the password and adding saltto the hash

    user = await User.create({
        name: req.body.name,                     //Taking user info from body
        email: req.body.email,
        password: secPass,                       //passing the secPass variable to password to store
    })

    const data = {
        user: {                     // data retrival using id is fast
            id: user.id             //creating data variable giving it the id of the data to retrive data fast
        }
    }

    const authToken = jwt.sign(data, JWT_SEC);     //signing the jwt token so we can know if the token has tampered or not

    res.json({authToken});
    } catch (error) {
        res.status(500).json({error: "Internal server error"});            
    }
})


        //due to async function no need to use .then and .catch
        // }).then (user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error: "please enter a unique value for email", message : err.message})})   //if error for same email
       
        // const user = User(req.body);                //what comes for the User in body saving it to a variable user
    // user.save();                                //to save the  data to db  

//ROUTE : 2    user login using: POST  /api/auth/login . No login required
router.post('/login', [
    body('email','Enter valid email').isEmail(),
    body('password','Enter valid password').exists()
], async (req, res)=>{
    let success = false;
    //check fon an error if exists return
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
                success = false;
            res.status(400).json({success, error:"Please login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;
            res.status(400).json({success, error:"Please login with correct credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SEC);
        success = true;
        res.json({success, authToken});

    } catch (error) {
        res.status(500).json({error: "Internal server error"});            
    }
})

//ROUTE : 3  Get user details using: POST  /api/auth/getuser . Login required
//using the middleware fetchuser
router.post('/getuser',fetchuser, async (req, res)=>{
    try {
        //Fetching user id form req.user.id
        const userId = req.user.id;
        //fetching all the data of the user except password using userid
        const user = await User.findById(userId).select("-password");
        //displaying the user details
        res.send({user});
    } catch (error) {
        res.status(500).json({error: "Internal server error"});            
    }
})
    
    module.exports = router;
