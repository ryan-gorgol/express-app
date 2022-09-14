const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "you must have a username"],
    unique: [true, "username already exists, please try a new username"]
  },
  password: {
    type: String,
    require: [true, "user must have a password"],
  },
  displayName: {
    type: String,
  }, 
  roomAccess: [{
    type: String, 
  }]
})

const User = mongoose.model("User", userSchema)

module.exports = User;