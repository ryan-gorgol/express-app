const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "room must have a title"]
  },
  body: {
    type: String,
    required: [true, "room must have a body"]
  }
})


const Room = mongoose.model("Room", roomSchema);
module.exports = Room;