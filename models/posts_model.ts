import mongoose from "mongoose";
const Schema = mongoose.Schema;
const postsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  sender: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Posts", postsSchema);
