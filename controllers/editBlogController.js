import { Blog } from "../database_schema/blogdb.js";

export const updateBlog = async (req, res) => {
  const { content, title, image_name, category, blogId } = req.body;
  try {
    const updated_blog = await Blog.updateOne(
      { _id: blogId },
      {
        content: content,
        title: title,
        image: image_name,
        category: category,
      }
    );
    res.json({ updated_blog });
  } catch (error) {
    console.log(error);
    res.json({ message: "an error occured" });
  }
};
