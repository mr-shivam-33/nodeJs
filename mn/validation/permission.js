const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validatePermissionInput(data) {
    let errors = {};
    data.userId = !isEmpty(data.userId) ? data.userId : "";
    data.permissions = !isEmpty(data.permissions) ? data.permissions : "";   
    if (Validator.isEmpty(data.permissions)) {
        errors.permissions = "permission field is required";
    }
    if (Validator.isEmpty(data.userId)) {
        errors.userId = "userId field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};