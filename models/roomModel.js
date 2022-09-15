const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "room must have a title"]
  },
  pin: {
    type: String,
    required: [true, "room must have a pin number"]
  },
  counter: {
    type: Number,
    required: [true, "room must have a count"]
  },
  open: {
    type: Boolean,
  }, 
  userAccessList: [{
    userId: String,
  }]
})


const Room = mongoose.model("Room", roomSchema);
module.exports = Room;