"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const comments_controller_1 = __importDefault(require("../controllers/comments_controller"));
router.post("/add-comment", comments_controller_1.default.addComment);
router.get("/comment/:comment_id", comments_controller_1.default.readCommentById);
router.put("/comment/:comment_id", comments_controller_1.default.updateComment);
router.delete("/comment/:comment_id", comments_controller_1.default.deleteCommentById);
router.get("/comments/:post_id", comments_controller_1.default.getCommentsByPostId);
exports.default = router;
//# sourceMappingURL=comments_routes.js.map