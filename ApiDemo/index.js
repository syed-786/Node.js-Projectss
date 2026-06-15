const express = require("express");
const userRouter = require("./routes/user");
const connectMondoDB = require("./connection");
const { logReqRes } = require("./middlewares");

const app = express();
const port = process.env.PORT || 3003;

//MongoDB Connection
connectMondoDB("mongodb://127.0.0.1:27017/usersdb").then(() =>
  console.log("MongoDB Connected"),
);

//MiddleWares
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes("log.txt"));
app.use(express.json());
//Routes
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
