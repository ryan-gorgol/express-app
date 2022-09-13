const User = require("../models/userModel")

const bcrypt = require("bcryptjs")
// const uuid = require('uuid');

exports.signUp = async (req, res) => {
  const { username, password } = req.body
  // const newUserId = uuid.v4()
  
  try {
    const hashpassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      username,
      password: hashpassword
    })
    // req.session.user = newUser
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (e) {
    res.status(400).json({
      status: `failed. Must have a unique username <--> ${e}}`
    })
  }
}

exports.login = async (req, res) => {
  const {username, password} = req.body
  
  try {
    const user = await User.findOne({ username })
    
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'user not found'
      })
    }

    const isCorrect = await bcrypt.compare(password, user.password)

    if (isCorrect) {
      // req.session.user = user
      res.status(200).json({
        status: 'success'
      })
    } else {
      res.status(400).json({
        status: 'failed',
        message: 'incorrect username or password'
      })
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed"
    })
  }
}

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).json({

      status: `success: get all rooms! Req.query.id:${req.query.id}`,
      data: {
        users
      }
    })
  } catch (e) {
    res.status(400).json({
      stats: `failed to get all users... Req.query.id:${req.query.id}`,
    });
  }
}