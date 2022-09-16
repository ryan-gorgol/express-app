const Room = require("../models/roomModel")

const bcrypt = require("bcryptjs")

exports.GetAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find()

    res.status(200).json({

      status: `success: get all rooms! Req.query.id:${req.query.id}`,
      data: {
        rooms
      }
    })
  }
  catch (e) {
    res.status(400).json({
      stats: `failed to get all rooms... Req.query.id:${req.query.id}`,
    });
  }
}

exports.GetOneRoom = async (req, res) => {
  const { pin } = req.body
  const { id } = req.params

  try {
    const room = await Room.findById(id)

    const isPinCorrect = await bcrypt.compare(pin, room.pin)

    if (isPinCorrect) {
        res.status(200).json({
        status: 'success: logged in to room'
      })
    } else {
      return res.status(400).json({
        status: 'failed',
        message: `incorrect pin. please try again.`
      })
    }
  }
  catch (e) {
    return res.status(400).json({
      stats: `failed to get a specific room. Error: ${e}.Req.params.id: ${req.params.id} `,
    });
  }
}

exports.CreateRoom = async (req, res) => {
  const { pin, title, id } = req.body
  try {
    const hashPin = await bcrypt.hash(pin, 12)
    const room = await Room.create({
      title: title,
      pin: hashPin,
      counter: 0,
      open: false,
      userAccessList: [{ userId: id }]
    })

    res.status(200).json({
      status: "success: created a room",
      data: {
        room
      }
    })
  }
  catch (e) {
    res.status(400).json({
      stats: `failed to create room. Err: ${e}`,
    });
  }
}

exports.UpdateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      status: "success: updated a specific room",
      data: {
        room
      }
    })
  }
  catch (e) {
    console.log(e, "error at UpdateRoom")
    res.status(400).json({
      stats: "failed to update a specific room",
    });
  }
}

exports.DeleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: "success: deleted specific room"
    })
  }
  catch (e) {
    res.status(400).json({
      stats: "failed to delete a room",
    });
  }
}

exports.ChangeCounter = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      status: "success: changed counter",
      data: {
        room
      }
    })
  }
  catch (e) {
    res.status(400).json({
      stats: "ChangeCounter: failed to change counter",
    })
  }
}