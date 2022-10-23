import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.js";
import reviewRoute from "./routes/review.js";
import usersRoute from "./routes/users.js";

const app = express();

var allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use(express.static("public"));

app.use("/api/users", usersRoute);
app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoute);

app.get("/", (req, res) => {
  res.status(200).json("Connected");
});

app.listen(8808, () => {
  console.log("Connected!");
});