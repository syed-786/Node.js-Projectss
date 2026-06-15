const User = require("../models/user").default;

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  return res.json(allUsers);
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  return res.json(user);
};

const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, userData);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    return res.json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const replaceUserById = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    return res.json({
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  replaceUserById,
};
