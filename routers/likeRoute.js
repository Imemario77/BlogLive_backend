import { Router } from "express";
import { likeBlog } from "../controllers/likeController.js";

const likeRoute = Router();

likeRoute.put("/blog", likeBlog);

export default likeRoute;
