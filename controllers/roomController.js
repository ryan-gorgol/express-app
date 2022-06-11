const Room = require("../models/roomModel")

exports.GetAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find()

    res.status(200).json({
      status: "sucess",
      data: {
        rooms
      }
    })
  }
  catch (e) {
    res.status(400).json({
      stats: "failed to get rooms",
    });
  }
}

exports.GetOneRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params._id)

    res.status(200).json({
      status: "sucess",
      data: {
        room
      }
    })
  }
  catch (e) {
    res.status(400).json({
      stats: "failed to get a room",
    });
  }
}

exports.CreateRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body)

    res.status(200).json({
      status: "sucess",
      data: {
        room
      }
    })
  }
  catch (e) {
    res.status(400).json({
      stats: "failed to create rooms",
    });
  }
}

exports.UpdateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      status: "sucess",
      data: {
        room
      }
    })
  }
  catch (e) {
    res.status(400).json({
      stats: "failed to update a room",
    });
  }
}

exports.DeleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: "sucess"
    })
  }
  catch (e) {
    res.status(400).json({
      stats: "failed to delete a room",
    });
  }
}