"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const posts_controller_1 = __importDefault(require("../controllers/posts_controller"));
router.get("/", posts_controller_1.default.getAllPosts);
router.post("/", posts_controller_1.default.addPost);
router.get("/post/:post_id", posts_controller_1.default.getPostById);
router.get("/post", posts_controller_1.default.getPostsBySender);
router.put("/post/:id", posts_controller_1.default.updatePost);
exports.default = router;
//# sourceMappingURL=posts_routes.js.map