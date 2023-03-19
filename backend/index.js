import express, { json } from "express";
import cors from "cors";
import authRoute from "./routes/auth.js";
import commentsRoute from "./routes/comments.js";
import likesRoute from "./routes/likes.js";
import postsRoute from "./routes/posts.js";
import relationshipsRoute from "./routes/relationships.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../soc2/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file ;
  return res.json(file.filename).status(200) ;
})

app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/likes", likesRoute);
app.use("/api/posts", postsRoute);
app.use("/api/relationships", relationshipsRoute);
app.use("/api/users", usersRoute);

app.listen(8800, () => {
  try {
    console.log("bien connecté au serveur");
  } catch (err) {
    console.log(err);
  }
});
