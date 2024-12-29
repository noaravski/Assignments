import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Comment", commentSchema);