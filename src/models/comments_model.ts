import mongoose from "mongoose";

export interface IComments {
  content: string;
  sender: string;
  postId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const commentsSchema = new mongoose.Schema<IComments>({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const commentsModel = mongoose.model<IComments>("Comments", commentsSchema);

export default commentsModel;
