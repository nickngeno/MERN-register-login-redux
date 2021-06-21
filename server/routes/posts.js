const express = require('express')
const router = express.Router()
const auth = require('../middleware/verifytoken')

router.get('/',auth , (req,res) =>{
    res.status(200).json({title: "My first post", description: "This is my first jwt token in play!"})
})

module.exports = router;
