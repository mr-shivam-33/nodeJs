const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateAddUserInput(data) {
    let errors = {};
    data.userId = !isEmpty(data.userId) ? data.userId : "";
    data.factoryName = !isEmpty(data.factoryName) ? data.factoryName : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.country = !isEmpty(data.country) ? data.country : "";
    data.state = !isEmpty(data.state) ? data.state : "";
    data.city = !isEmpty(data.city) ? data.city : "";   
    data.contactNo = !isEmpty(data.contactNo) ? data.contactNo : "";
    data.pincode = !isEmpty(data.pincode) ? data.pincode : "";      

    if (Validator.isEmpty(data.userId)) {
        errors.userId = "userId field is required";
    }
    if (Validator.isEmpty(data.factoryName)) {
        errors.factoryName = "factory name field is required";
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = "address field is required";
    }
    if (Validator.isEmpty(data.country)) {
        errors.country = "country field is required";
    }
    if (Validator.isEmpty(data.state)) {
        errors.state = "state field is required";
    }    
    if (Validator.isEmpty(data.city)) {
        errors.city = "city field is required";
    }    
    if (Validator.isEmpty(data.contactNo)) {
        errors.contactNo = "contact field is required";
    }
    if (Validator.isEmpty(data.pincode)) {
        errors.pincode = "pincode field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};