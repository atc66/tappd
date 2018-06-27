const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLocationInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  // Empty Error validator
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  // Descrition length
  if (!Validator.isLength(data.description, { min: 10, max: 300 })) {
    errors.description = "Description must be between 10 and 300 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
