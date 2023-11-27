import { Router } from "express";
import { authMiddleware } from "../helpers/authenticationMIddleware.js";
import {
  CreateBlog,
  Get_users_blog,
  Get_all_blog_post,
  delete_users_blog,
} from "../controllers/CreateBlog.js";

const BlogRoute = Router();

BlogRoute.get("/all_blogs", Get_all_blog_post);
BlogRoute.get("/current_blog/:blogId", Get_users_blog);
BlogRoute.delete("/:blogId", delete_users_blog);

BlogRoute.use(authMiddleware);
BlogRoute.post("/create", CreateBlog);

export default BlogRoute;
