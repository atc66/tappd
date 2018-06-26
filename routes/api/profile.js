const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Profile validation
const validateProfileInput = require("../../validation/profile");

// Profile and User Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @Route GET api/profile
// @DESC current user profile
// @access private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", "name")
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No Profile found";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @Route POST api/profile
// @DESC CREATE || Edit user profile
// @access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // errors
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Profile fields
    const profileFields = {};
    // get the user from the logged in user, includes name and email
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;

    // Empty social object
    profileFields.social = {};
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({ user: req.user.id }).then(profile => {
      // Update if profile exists
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create if no profile
        // Checking if the handle already exist
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That profile already exists";
            res.status(400).json(errors);
          }
          // Create or save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @Route GET api/profile/handle/:handle
// @DESC FIND user profile by handle
// @access public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", "name")
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for that user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @Route GET api/profile/user/:userid
// @DESC FIND user profile by user id
// @access public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", "name")
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for that user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @Route GET api/profile/all
// @DESC FIND all user profiles
// @access public

router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", "name")
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no user profiles created";
        return res.status(404).json.errors;
      }
      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({
        profile: "There are no profiles"
      })
    );
});

module.exports = router;
