const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports = function(app) {
    app.post("/posts/:postId/comments", function(req, res) {
        const comment = new Comment(req.body);
        comment
            .save()
            .then(comment => {
                return Post.findById(req.params.postId);
            })
            .then(post => {
                post.comments.unshift(comment);
                return post.save();
            })
            .then(post => {
                res.redirect(`/`);
            })
            .catch((err) => {
                console.log("...uh-oh")
                console.log(err.message);
            });
    });
}
