const express = require("express");
const cors = require('cors')

const roomController = require("../controllers/roomController");
const protect = require("../middleware/authMiddleware")

const router = express.Router();

router
  .route("/")
  .get(protect, roomController.GetAllRooms)
  .post(protect, roomController.CreateRoom)

router
  .route("/:id")
  .get(protect, roomController.GetOneRoom)
  .patch(protect, roomController.UpdateRoom)
  .delete(protect, roomController.DeleteRoom)

module.exports = router;