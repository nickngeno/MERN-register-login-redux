var express = require('express');
var router = express.Router();
const User = require('../models/userModel')

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get("/list", (req, res) =>{
  User.find({}, (err, response) => {
    if(err) return res.send({"success": false, "message": "Nothing found!"})
    else
    res.status(200).json({"success": true,"data":response})
  })
})

router.post("/register" , (req, res, next) =>{
  const newuser = new User(req.body)
  // console.log(newUser)
  newuser.save((err, newuser) => {
    if(err){
      handleError(err)
    }
    res.status(200).json({message: "User Saved successfully!", user: newuser})
  })
})

router.post("/login", (req, res) =>{

  User.findOne({email: req.body.email, password: req.body.password}, (err, user) => {
    if(err) return res.json({status: 0, message: err})
    else if(!user) return res.json({status:0 , message: "user not found"})
    else {
      return res.status(200).json({success: true, user: user})
    }
  })
})


module.exports = router;
