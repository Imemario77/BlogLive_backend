import express from "express";
import mongoose from "mongoose";
import AuthRoute from "./routers/AuthRoute.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import BlogRoute from "./routers/blogRoute.js";
import uploadRoute from "./routers/uploadRoute.js";
import commentRoute from "./routers/commentRoute.js";
import likeRoute from "./routers/likeRoute.js";
import updateUserRoute from "./routers/updateUserRoute.js";
import getUserRoute from "./routers/GetUserRoute.js";
import updateBlogRoute from "./routers/updateBlogRoute.js";
import Session from "express-session";
import { socket, start_socket_connection } from "./helpers/sockethandler.js";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const port = "3000";

// initalizing the socket for realtime interaction
const io = socket(httpServer);

io.on("connection", (socket) => start_socket_connection(io, socket));

mongoose
  .connect(process.env.mongodb)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(`This Error Occured: ${err}`));

// app middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
// app.use(
//   Session({
//     secret: "bloglive app",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app public folder
app.use(express.static(`public`));
app.use("/images", express.static("images"));

// app  authentication route
app.use("/auth", AuthRoute);

//app blog route
app.use("/blog", BlogRoute);

//app comment route
app.use("/comment", commentRoute);

// app like route
app.use("/like", likeRoute);

//update user info
app.use("/update/user", updateUserRoute);

// update blog info
app.use("/update/blog", updateBlogRoute);

// find specfic user
app.use("/find", getUserRoute);

// file upload route
app.use("/file", uploadRoute);

httpServer.listen(port, () =>
  console.log(`web sever has started on port ${port}`)
);
