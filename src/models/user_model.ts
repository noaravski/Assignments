import mongoose from "mongoose";

export interface IUser {
  email: string;
  username?: string;
  password: string;
  _id?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model<IUser>("Users", userSchema);

export default userModel;