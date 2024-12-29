import postModel, { IPost } from "../models/posts_model";
import BaseController from "./base_controller";

const postsController = new BaseController<IPost>(postModel);

export default postsController;
