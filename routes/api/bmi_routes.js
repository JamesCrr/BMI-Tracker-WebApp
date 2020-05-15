const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load Input validation
const {validateAllNumbers} = require("../../validation/validations");

// Load BMI Model
const BMI_Model = require("../../models/bmi_model");

// @route POST api/bmi/logbmi
// @desc Logs new BMI in Database or edits existing
// @access Public
router.post("/logbmi", (req, res) => {
    
  // Input Number validation
  const { errors, isValid } = validateAllNumbers(req.body.bmi);
  // Check validation
  // console.log("BMI: ", req.body.bmi, " BMI Valid: ", isValid);
  if(!isValid) {
      return res.status(400).json(errors);
  }

  // Check if date already used
  BMI_Model.findOne({ 
    owner: req.body.owner,
    date: req.body.date
  })
  .then(user => {
    if(!user){
      console.log("Date does not exist!, Adding to DB");
      const newBMIData = new BMI_Model({
        owner: req.body.owner,
        bmi: req.body.bmi,
        date: req.body.date
      });
      newBMIData.save();
      return res.json("BMI Added!")
    }
    user.bmi = req.body.bmi;
    user.save();
    return res.json("BMI Edited!");
  })
  .catch(error => {
    return res.status(400).json(error);
  });

});

// @route POST api/bmi/getbmi
// @desc Retrieves BMI
// @access Public
router.post("/getbmi", (req, res) => {

  // Get all BMI whose owner matches
  BMI_Model.find({ 
    owner: req.body.id
  })
  .then(data => {
    if(data.length == 0)
      console.log("Data length returned is 0");
    return res.json(data);
  })
  .catch(error => {
    return res.status(400).json(error);
  });

});

// @route POST api/bmi/clearbmis
// @desc Retrieves BMI
// @access Public
router.post("/clearbmis", (req, res) => {
  BMI_Model.deleteMany({
    owner: req.body.id
  })
  .then(data => {
    return res.json(data);
  })
  .catch(error => {
    return res.status(400).json(error);
  })
});


module.exports = router;