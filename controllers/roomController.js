const Room = require("../models/roomModel")

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

exports.GetOneRoom = async (req, res, next) => {
  try {
    const id = req.params.id
    const room = await Room.findById(id)

    res.status(200).json({
      status: "success: got one room",
      data: {
        room
      }
    }) 
  }
  catch (e) {
    res.status(400).json({
      stats: `failed to get a specific room. Error: ${e}.Req.params.id: ${req.params.id} `,
    });
  }
}

exports.CreateRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body)

    res.status(200).json({
      status: "success: created a room",
      data: {
        room
      }
    })
  }
  catch (e) {
    res.status(400).json({
      stats: "failed to create room",
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

exports.DeleteRoom = async (req, res, next) => {
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

exports.ChangeCounter = async (req, res, next) => {
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