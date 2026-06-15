const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const mongoose = require("mongoose");

//Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/usersdb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Define a schema for the user data
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true },
);

// Create a model based on the schema
const User = mongoose.model("user", userSchema);

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/users", async (req, res) => {
  const users = await User.find();
  const html = `
    <h1>User List!</h1>
    <ul>
        ${users.map((user) => `<li>${user.firstName} ${user.lastName} - ${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});
  return res.json(allUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
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
  })
  .put(async (req, res) => {
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
  })
  .delete(async (req, res) => {
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
  });

app.post("/api/users", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
