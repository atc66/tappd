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
// Post validation
const validatePostInput = require("../../validation/post");

// @Route GET api/locations/test
// @DESC test location route
// @access public
router.get("/test", (req, res) => res.json({ msg: "Locations works" }));

// @Route POST api/locations/
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

// @Route GET api/locations
// @DESC GET all locations route
// @access public

router.get("/", (req, res) => {
  Location.find()
    .sort({ date: -1 })
    .then(locations => res.json(locations))
    .catch(err => res.status(404));
});

// @Route GET api/locations/:id
// @DESC GET locations route
// @access public
router.get("/:id", (req, res) => {
  Location.findById(req.params.id)
    .then(locations => res.json(locations))
    .catch(err =>
      res
        .status(404)
        .json({ nolocationfound: "No location found with that ID" })
    );
});

// @Route DELETE api/locations/:id
// @DESC DELETE locations route
// @access private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Location.findById(req.params.id)
        .then(location => {
          // Check for location owner
          if (location.user.toString() !== req.user.id) {
            return res.status(401).json({
              notauthorized: "User not authorized to delete this location"
            });
          }
          location.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res
            .status(404)
            .json({ locationnotfound: "That location was not found" })
        );
    });
  }
);

// @Route POST api/locations/like/:id
// @DESC LIKE locations route
// @access private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Location.findById(req.params.id)
        .then(location => {
          if (
            location.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadylike: "User already liked this location" });
          }
          location.likes.unshift({ user: req.user.id });
          location.save().then(post => res.json(post));
        })
        .catch(err =>
          res
            .status(404)
            .json({ locationnotfound: "That location was not found" })
        );
    });
  }
);

// @Route POST api/locations/unlike/:id
// @DESC UNLIKE locations route
// @access private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Location.findById(req.params.id)
        .then(location => {
          if (
            location.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ alreadylike: "User has not liked this location yet" });
          }
          const removeIndex = location.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          location.likes.splice(removeIndex, 1);
          location.save().then(location => res.json(location));
        })
        .catch(err =>
          res
            .status(404)
            .json({ locationnotfound: "That location was not found" })
        );
    });
  }
);

// @Route POST api/locations/comment/:id
// @DESC Comment locations route
// @access private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Location.findById(req.params.id)
      .then(location => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          user: req.user.id
        };
        // Add to comment array
        location.comments.unshift(newComment);
        // Save
        location.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ locationnotfound: "No Location found" })
      );
  }
);

// @Route DELETE api/loctions/comment/:id/:comment_id
// @DESC REMOVE Comment loctions route
// @access private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Location.findById(req.params.id)
      .then(location => {
        // Check if comment exists
        if (
          location.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "That comment does not exist." });
        }
        // Remove from index
        const removeIndex = location.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        // Splice from comment array
        location.comments.splice(removeIndex, 1);
        // Save
        location.save().then(post => res.json(location));
      })
      .catch(err =>
        res.status(404).json({ locationnotfound: "No location found" })
      );
  }
);

module.exports = router;
