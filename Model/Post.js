import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    userid:{
      type:String,
      required:true
  },
    caption: {
      type: String,
      required:true,
      max: 200,
    },
    imageUrl: {
      type: String,
    },
    vidioUrl: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: []
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
