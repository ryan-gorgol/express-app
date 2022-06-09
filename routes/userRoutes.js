const express = require("express")

const authController = require("../controllers/authController")

const router = express.Router();

router.route("/signup", authController.signUp)

module.exports = router;