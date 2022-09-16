const express = require("express")

const authController = require("../controllers/authController")

const protect = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/signup", authController.signUp)
router.post("/login", authController.login)
router.get("/", authController.listUsers)
router.get("/userauth", authController.findOneUser)

module.exports = router;