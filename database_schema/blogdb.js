import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requried: true,
    },
    image: {
      type: String,
      requried: true,
    },
    category: {
      type: String,
      requried: true,
    },
    content: {
      type: String,
      requried: true,
    },
    author: {
      type: Object,
      requried: true,
    },
    likes: Array,
  },
  {
    timestamps: true,
  }
);

export const Blog = new mongoose.model("blog", blogSchema);
