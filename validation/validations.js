const Validator = require("validator");
const isEmpty = require("is-empty");

const validateRegisterInput = (data) => {
    // Instantiate errors Obj
    let errors = {};

    // Convert empty fields to empty strings
    // as Validator only works with strings
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Name Checks
    if(Validator.isEmpty(data.name)) {
        errors.name = "Name field is required!";
    }
    // Email Checks
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field is required!";
    } 
    else if (!Validator.isEmail(data.email)){
        errors.email = "Email is invalid!";
    }
    // Password Checks
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required!";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

const validateLoginInput = (data) => {
    // Instantiate errors Obj
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

const validateAllNumbers = (data) => {
    // Instantiate errors Obj
    let errors = {};

    // Convert empty fields to empty strings
    // as Validator only works with strings
    const dataString = !isEmpty(data) ? data.toString() : "";

    // Checks
    if(Validator.isEmpty(dataString)) {
        errors.isEmpty = "Data is Empty!";
    }
    if(!Validator.isNumeric(dataString)){
        errors.isNum = "Data contains characters other than numerics!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports.validateRegisterInput = validateRegisterInput;
module.exports.validateLoginInput = validateLoginInput;
module.exports.validateAllNumbers = validateAllNumbers;
