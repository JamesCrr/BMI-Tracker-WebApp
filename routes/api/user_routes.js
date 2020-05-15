const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const {validateRegisterInput, validateLoginInput} = require("../../validation/validations");

// Load User Model
const User = require("../../models/user_model");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    console.log("RegisterData Valid: ", isValid);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    
    User.findOne({ email: req.body.email })
        .then(user => {
            // Try to find existing user in database
            if (user) 
                return res.status(400).json({ email: "Email already exists" });
        
            // Create new User
            console.log("New User Created!");
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) 
                    throw err;

                newUser.password = hash;
                newUser.save()
                    .then(user => res.json(user.id))
                    .catch(err => console.log(err));
                });
            });
        });

});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    
    // Check validation
    console.log("LoginData Valid: ", isValid);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email })
    .then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                console.log("Logged In!");
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        // Return the signed Token 
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    });
            } 
            else {
                return res.status(400).json({ passwordincorrect: "Password incorrect" });
            }
        });
        
    });
  });

  module.exports = router;