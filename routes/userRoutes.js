const express = require("express")

const authController = require("../controllers/authController")

const protect = require("../middleware/authMiddleware")

const router = express.Router();

router 
  .route("/allusers")
  .get(protect, authController.listUsers)

router 
  .route("/userauth")
  .get(protect, authController.findOneUser)

router.post("/signup", authController.signUp)
router.post("/login", authController.login)

// TO BE DONE!
// router.post("/logout", authController.logout)


module.exports = router;

