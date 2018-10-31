const mongoose = require('mongoose');
const Post = mongoose.model('Post', {
    title: String,
    author: String,
    summary: String,
    upvote: Number
});
module.exports = Post;
