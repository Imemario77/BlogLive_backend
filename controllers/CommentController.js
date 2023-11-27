import { Comment } from "../database_schema/commentdb.js";

export const CreateComment = async (req, res) => {
  const { userId, blogId, comment, userName } = req.body;
  try {
    const new_comment = new Comment({
      comment,
      blogId,
      userId,
      userName,
    });
    const result = await new_comment.save();
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.json({ message: "an error occured try again later" });
  }
};

export const GetBlogComment = async (req, res) => {
  const { blogID } = req.params;
  if (blogID) {
    try {
      const result = await Comment.find({ blogId: blogID });
      res.json({ result });
    } catch (error) {
      console.log(error);
      res.json({
        message: "an error occured getting the comments try again later",
      });
    }
  }
};
