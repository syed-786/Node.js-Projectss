const User = require("../models/user");

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
  console.log("req:", userData);
  try {
    const user = await User.findByIdAndUpdate(userId, userData);
    console.log("users ", user);
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

const createNewUser = async (req, res) => {
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
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  replaceUserById,
  createNewUser,
};
