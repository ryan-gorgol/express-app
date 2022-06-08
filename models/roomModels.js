const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
  count: {
    type: Number,
    require: [true, "huh, why doesn't this room have a count number?"]
  }
})

const Room = mongoose.model("Room", roomSchema)
module.exports = Room