const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateAddUserInput(data) {
    let errors = {};
    data.userName = !isEmpty(data.userName) ? data.userName : "";
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
    data.userType = !isEmpty(data.userType) ? data.userType : "";
   
   
    if (Validator.isEmpty(data.userName)) {
        errors.userName = "User Name field is required";
    }
    if (Validator.isEmpty(data.userType)) {
        errors.userType = "user type field is required";
    }
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name field is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }  
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    } 
    // if (Validator.isEmpty(data.mobile)) {
    //     errors.mobile = "Mobile field is required";
    // }else if (!Validator.isMobilePhone(data.mobile)) {
    //     errors.mobile = "Mobile is invalid";
    // }   
    return {
        errors,
        isValid: isEmpty(errors)
    };
};