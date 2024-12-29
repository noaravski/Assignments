"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_model_1 = __importDefault(require("../models/comments_model"));
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentBody = req.body;
    try {
        const comment = yield comments_model_1.default.create(commentBody);
        res.status(200).send(comment);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const readCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.comment_id;
    try {
        const comment = yield comments_model_1.default.findById(commentId);
        if (comment) {
            res.send(comment);
        }
        else {
            res.status(404).send("Comment not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.comment_id;
    const commentContent = req.body;
    try {
        const comment = yield comments_model_1.default.findByIdAndUpdate(commentId, commentContent, {
            new: true,
        });
        if (comment) {
            res.send(comment);
        }
        else {
            res.status(404).send("Comment not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const deleteCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.comment_id;
    try {
        const comment = yield comments_model_1.default.findByIdAndDelete(commentId);
        if (comment) {
            res.send(comment);
        }
        else {
            res.status(404).send("Comment not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const getCommentsByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.post_id;
    try {
        const comments = yield comments_model_1.default.find({ postId: postId });
        if (comments) {
            res.send(comments);
        }
        else {
            res.status(404).send("Comments not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.default = {
    addComment,
    readCommentById,
    updateComment,
    deleteCommentById,
    getCommentsByPostId
};
//# sourceMappingURL=comments_controller.js.map