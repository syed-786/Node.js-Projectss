const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  replaceUserById,
} = require("../controllers/user");
const router = express.Router();

router.get("/", getAllUsers);

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById)
  .put(replaceUserById);

router.post("/", async (req, res) => {
  const newUser = req.body;
  if (
    !newUser ||
    !newUser.firstName ||
    !newUser.lastName ||
    !newUser.email ||
    !newUser.jobTitle ||
    !newUser.gender
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const result = await User.create(newUser);

  return res.status(201).json({
    message: "User added successfully",
    userId: result._id,
  });
});

module.exports = router;
