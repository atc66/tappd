const express = require("express");
const router = express.Router();

// @Route GET api/location/test
// @DESC test location route
// @access public
router.get("/test", (req, res) => res.json({ msg: "Locations works" }));

module.exports = router;
