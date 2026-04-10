
const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { User, validateUpdateUser } = require('../models/user');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

// ======================================

router.put("/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {

  //  if(req.user.id !== req.params.id){

  //     return res.status(403).json({message:"You're not allowed, you only can update your profile"})
  //  }


  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  console.log(req.headers);

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(updatedUser);
}));

// ======================================
// only admins
router.get("/", verifyTokenAndAdmin, asyncHandler(async (req, res) => {

  const users = await User.find().select("-password")
  res.status(200).json(users);
}));

// ======================================
// only admin and user himself
router.get("/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id).select("-password")

  if (user) {

    res.status(200).json(user);
  } else {

    res.status(404).json({ message: "User not found" });
  }

}));

// ======================================
// only admin and user himself
router.delete("/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id).select("-password")

  if (user) {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "USer has been deleted succfully" });
  } else {

    res.status(404).json({ message: "User not found" });
  }

}));

// ======================================

module.exports = router;