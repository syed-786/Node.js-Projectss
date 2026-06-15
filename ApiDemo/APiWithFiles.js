const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "MOCK_DATA.json");
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware are functions that have access to the request and response objects, and the next function in the request-response cycle.
// They can execute code, make changes to the request and response objects, end the request-response cycle,
// Or call the next middleware in the stack.

// Custom Middleware to log request details
app.use((req, res, next) => {
  console.log(
    "Custom Middleware: Request received at " + new Date().toISOString(),
  );
  next(); // need to call next() to pass control to the next middleware or route handler
});

// Custom Middleware to log request details to a file
app.use((req, res, next) => {
  fs.appendFile(
    "logFile.txt",
    `Request: ${new Date().toISOString()} : ${req.method}: ${req.path}\n`,
    (err) => {
      if (err) {
        console.log("Error writing to log file", err);
      }
      next();
    },
  );
});

app.get("/users", (req, res) => {
  const html = `
    <h1>User List!</h1>
    <ul>
        ${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  res.header("X-name", "Syed"); //custom header, always add X to custom header to avoid conflict with standard headers
  res.json(users);
});

// app.get("/api/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const user = users.find((u) => u.id === userId);
//   res.json(user);
// });

// if you want to handle multiple methods for the same route, you can use app.route().
app
  .route("/api/users/:id")
  .get((req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user);
  })
  .patch((req, res) => {
    const userId = parseInt(req.params.id);
    const updatedData = req.body;

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Partial Update
    users[userIndex] = {
      ...users[userIndex],
      ...updatedData,
    };

    fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf8", (err) => {
      if (err) {
        return res.status(500).json({
          message: "Error updating user",
        });
      }

      return res.status(200).json({
        message: "User updated successfully",
        user: users[userIndex],
      });
    });
  })
  .put((req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Replace Entire Object
    users[userIndex] = {
      id: userId,
      ...updatedUser,
    };

    fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf8", (err) => {
      if (err) {
        return res.status(500).json({
          message: "Error updating user",
        });
      }

      return res.status(200).json({
        message: "User replaced successfully",
        user: users[userIndex],
      });
    });
  })
  .delete((req, res) => {
    const userId = parseInt(req.params.id);

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Remove user from array
    const deletedUser = users.splice(userIndex, 1);

    fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf8", (err) => {
      if (err) {
        return res.status(500).json({
          message: "Error deleting user",
        });
      }

      return res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser[0],
      });
    });
  });

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  if (
    !newUser.first_name ||
    !newUser.last_name ||
    !newUser.email ||
    !newUser.gender ||
    !newUser.job_title
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  users.push({ ...newUser, id: users.length + 1 });

  fs.writeFile(filePath, JSON.stringify(users), "utf8", (err) => {
    if (err) {
      console.log("Error writing to file", err);
    } else {
      console.log("User added successfully");
    }
    return res.status(201).json({
      message: "User added successfully",
      userId: users[users.length - 1].id,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
