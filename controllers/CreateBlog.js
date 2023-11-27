import { Blog } from "../database_schema/blogdb.js";
import { Comment } from "../database_schema/commentdb.js";

export const CreateBlog = async (req, res) => {
  const { title, image_name, category, content, user } = req.body;
  try {
    const new_blog = new Blog({
      title,
      image: image_name,
      category,
      content,
      author: user,
    });
    const result = await new_blog.save();
    res.json({ result });
  } catch (error) {
    res.json({ message: "an error occured try again later" });
  }
};

export const Get_users_blog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const result = await Blog.findOne({ _id: blogId });
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ message: "an error occured" });
  }
};

export const Get_all_blog_post = async (req, res) => {
  try {
    const result = await Blog.find();
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ message: "an error occured" });
  }
};

export const delete_users_blog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const result = await Blog.deleteOne({ _id: blogId });
    const comments = await Comment.deleteMany({ blogId });
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ message: "an error occured" });
  }
};
