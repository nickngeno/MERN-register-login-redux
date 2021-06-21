var express = require("express");
var router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const Jwt = require('jsonwebtoken')
const {
  registerValidation,
  loginValidation,
} = require("../utils/validateRegistration");



/* GET users listing. */
router.get("/", function (req, res) {
  res.send("This is homepage!");
});

// registration validation

router.get("/list", (req, res) => {
  User.find({}, (err, response) => {
    if (err) return res.send({ success: false, message: "Nothing found!" });
    else res.status(200).json({ success: true, data: response });
  });
});

router.post("/register", async (req, res, next) => {
  const { error } = await registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //  check if email aready exist
  const response = await User.findOne({ email: req.body.email });
  if (response !== null) return res.status(400).send("Email already taken!");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  const newuser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedpassword,
  });
  newuser.save((err, newuser) => {
    if (err) {
      handleError(err);
    }
    res
      .status(200)
      .json({ message: "User Saved successfully!", user: newuser });
  });
});

router.post("/login", async (req, res) => {
  const { error } = await loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (user === null) return res.status(400).send("User does not exist!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.json({ success: false, message: "password is invalid!" });
 

  // create jwt token
  const token = Jwt.sign({_id:user._id},process.env.JWT_SECRET )
  res.header("auth-token", token)
  return res.status(200). json({ success: true, user: user, jwt_token: token })
  
});

module.exports = router;
