const mongoose = require('mongoose');
const Post = mongoose.model('Post', {
    title: String,
    subTitle: String,
    category: String,
    author: String,
    summary: String,
    upvote: Number
});
module.exports = Post;
