const protect = (req, res, next) => {
  const { auth } = req.cookies
  
  if (auth !== 'true') {
    return res.status(401).json({status: 'fail', message: 'unauthorized'})
  }

  next()
}

module.exports = protect