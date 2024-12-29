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
const posts_model_1 = __importDefault(require("../models/posts_model"));
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postBody = req.body;
    try {
        const post = yield posts_model_1.default.create(postBody);
        res.status(200).send(post);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield posts_model_1.default.find();
        res.send(posts);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.post_id;
    try {
        const post = yield posts_model_1.default.findById(postId);
        if (post) {
            res.send(post);
        }
        else {
            res.status(404).send("Post not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const getPostsBySender = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.sender;
    try {
        const posts = yield posts_model_1.default.find({ sender: filter });
        res.send(posts);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const post = yield posts_model_1.default.findById(postId);
        if (post) {
            post.content = req.body.content;
            yield post.save();
            res.send(post);
        }
        else {
            res.status(404).send("Post not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.default = {
    getAllPosts,
    getPostById,
    addPost,
    getPostsBySender,
    updatePost,
};
//# sourceMappingURL=posts_controller.js.map