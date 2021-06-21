const Jwt = require('jsonwebtoken')

const verifyToken = (req, res,next) =>{

    const token = req.header("auth-token")
    if(!token) return res.status(400).send("Access denied!")

    const verified = Jwt.verify(token,process.env.JWT_SECRET)
    if(!verified) return res.status(400).send("Invalid token!")
    res.user= verified
    next()

}
module.exports = verifyToken