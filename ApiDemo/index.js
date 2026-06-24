const express = require("express");
const userRouter = require("./routes/user");
const connectMondoDB = require("./connection");
const { logReqRes } = require("./middlewares");
const multer = require("multer");

const app = express();
const path = require("path");
const port = process.env.PORT || 3003;

// storage object for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//MongoDB Connection
connectMondoDB("mongodb://127.0.0.1:27017/usersdb").then(() =>
  console.log("MongoDB Connected"),
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//MiddleWares
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes("log.txt"));
app.use(express.json());
//Routes
app.use("/api/users", userRouter);

//eg. of file upload using multer
app.get("/", (req, res) => {
  return res.render("fileUpload");
});

app.post("/upload", upload.array("profileImage", 5), (req, res) => {
  console.log("file ", req.file);
  console.log("body ", req.body);
  return res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
