const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const postsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    owner: {
        type: String,
        required: true
    }
});

const Posts = mongoose.model("Posts", postsSchema);
module.exports = Posts