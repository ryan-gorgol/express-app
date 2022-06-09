const express = require("express");

const roomController = require("../controllers/roomController");
const protect = require("../middleware/authMiddleware")

const router = express.Router();

router
  .route("/")
  .get(roomController.GetAllRooms)
  .post(roomController.CreateRoom)

router
  .route("/:id")
  .get(roomController.GetOneRoom)
  .patch(roomController.UpdateRoom)
  .delete(roomController.DeleteRoom)

module.exports = router;