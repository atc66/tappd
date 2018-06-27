const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    max: 300
  }
});

module.exports = Location = mongoose.model("location", LocationSchema);
