"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const commentSchema = new Schema({
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model("Comment", commentSchema);
//# sourceMappingURL=comments_model.js.map