const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// User Schema
const bmiSchema = new Schema({
    owner:{
        type: String,
        required: true
    },
    bmi:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
})
// BMI Model
const bmiModel = mongoose.model("bmi", bmiSchema);
module.exports = bmiModel;