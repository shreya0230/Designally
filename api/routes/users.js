const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const multer = require("multer");

//Update
// router.put("/:id", async (req, res) => {
//   try {
//     // Check if the user is authenticated and authorized to update the account
//     if (req.body.userId !== req.params.id) {
//       return res.status(401).json("You can update only your account.");
//     }

//     // Check if the request contains a password update
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }

//     // Update the user's information
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );

//     // Return the updated user data
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json("An error occurred while updating the account.");
//   }
// });

// Route to update the user's selected profile picture
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const selectedProfilePic = req.body.selectedProfilePic;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's selectedProfilePic field
    user.selectedProfilePic = selectedProfilePic;

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: "Selected profile picture updated successfully" });
  } catch (error) {
    console.error("Error updating selected profile picture:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username }, {useFindAndModify: false});
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
        
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;