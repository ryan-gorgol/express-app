const Room = require("../models/roomModels");

exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({
      status: 'success',
      results: rooms.length,
      data: {
        rooms
      }
    })
  } catch (e) {
    res.status(400).json(
      {
        status: `failed to get rooms. ${rooms}`
      }
    )
  } 
}

exports.getOneRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      results: room.length,
      data: {
        room
      }
    })
  } catch (e) {
    res.status(400).json(
      {
        status: `failed: ${e}`
      }
    )
  } 
}

exports.createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body)

    res.status(200).json({
      status: 'success',
      results: room.length,
      data: {
        room
      }
    })
  } catch (e) {
    res.status(400).json(
      {
        status: `failed to get rooms. ${rooms}`
      }
    )
  } 
}

exports.updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: 'success',
      results: room.length,
      data: {
        room
      }
    })
  } catch (e) {
    res.status(400).json(
      {
        status: "fail"
      }
    )
  } 
}

exports.deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'success',
    })
  } catch (e) {
    res.status(400).json(
      {
        status: "fail"
      }
    )
  } 
}

