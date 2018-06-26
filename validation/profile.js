const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";
  data.location = !isEmpty(data.location) ? data.location : "";

  // Is it an email? use !validator bc we are checking to see if it doesnt work
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must have 2 to 40 characters";
  }

  // Empty Error validator
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }
  if (Validator.isEmpty(data.bio)) {
    errors.bio = "Bio field is required";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  // Social Websites
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
