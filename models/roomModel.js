const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "room must have a title"]
  },
  password: {
    type: String,
    required: [true, "room must have a body"]
  },
  counter: {
    type: Number,
    required: [true, "room must have a count"]
  }
})


const Room = mongoose.model("Room", roomSchema);
module.exports = Room;