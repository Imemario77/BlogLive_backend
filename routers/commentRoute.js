import { Router } from "express";
import {
  CreateComment,
  GetBlogComment,
} from "../controllers/CommentController.js";

const commentRoute = Router();


commentRoute.post("/add_comment", CreateComment);
commentRoute.get("/get_comment/:blogID", GetBlogComment);

export default commentRoute;
