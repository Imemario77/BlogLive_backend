import { Router } from "express";
import { updateBlog } from "../controllers/editBlogController.js";

const updateBlogRoute = Router();

updateBlogRoute.put("/blog", updateBlog);

export default updateBlogRoute
