const express = require("express");

const roomController = require("../controllers/roomController");

const router = express.Router();

router.route("/").get(roomController.GetAllRooms).post(roomController.CreateRoom)

router.route("/:id").get(roomController.GetOneRooms).patch(roomController.UpdateRoom).delete(roomController.DeleteRoom)

module.exports = router;