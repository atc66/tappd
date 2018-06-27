const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Location Model
const Location = require("../../models/Location");
// Profile Model
const Profile = require("../../models/Profile");

// Post validation
const validateLocationInput = require("../../validation/location");

// @Route GET api/locations/test
// @DESC test location route
// @access public
router.get("/test", (req, res) => res.json({ msg: "Locations works" }));

// @Route POST api/location/
// @DESC create location route
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateLocationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newLocation = new Location({
      title: req.body.title,
      description: req.body.description,
      lat: req.body.lat,
      lng: req.body.lng,
      user: req.user.id
    });
    newLocation.save().then(location => res.json(location));
  }
);

module.exports = router;
