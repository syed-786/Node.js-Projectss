const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  replaceUserById,
  createNewUser,
} = require("../controllers/user");
const router = express.Router();

router.route("/").get(getAllUsers).post(createNewUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById)
  .put(replaceUserById);

module.exports = router;
