import { Blog } from "../database_schema/blogdb.js";

export const likeBlog = async (req, res) => {
  const { userId, blogId } = req.body;

  try {
    const found_blog = await Blog.findOne({ _id: blogId });

    if (found_blog.likes.includes(userId)) {
      await found_blog.updateOne({ $pull: { likes: userId } });
      console.log("unlike");
      res.status(200).send("unlike succesfull");
    } else {
      await found_blog.updateOne({ $push: { likes: userId } });
      console.log("like");
      res.status(200).send("like succesfull");
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "an error occoured " });
  }
};
