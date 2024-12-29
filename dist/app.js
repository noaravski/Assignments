"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.DB_CONNECT);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to the database");
});
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const posts_routes_1 = __importDefault(require("./routes/posts_routes"));
app.use("/", posts_routes_1.default);
const comments_routes_1 = __importDefault(require("./routes/comments_routes"));
app.use("/", comments_routes_1.default);
app.listen(port, () => {
    console.log("app is running!");
});
//# sourceMappingURL=app.js.map