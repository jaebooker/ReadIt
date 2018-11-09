const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
module.exports = function(app) {
    app.post("/posts/:postId/comments", function(req, res) {
        if (req.user) {
        const comment = new Comment(req.body);
        comment.author = req.user._id;
        comment
            .save()
            .then(comment => {
                return Post.findById(req.params.postId);
            })
            .then(post => {
                post.comments.unshift(comment);
                return post.save();
            })
            .then(comment => {
                return User.findById(req.user._id);
            })
            .then(user => {
                user.comments.unshift(comment);
                user.save();
                res.redirect('/');
            })
            .then(post => {
                res.redirect('/');
            })
            .catch((err) => {
                console.log("...uh-oh")
                console.log(err.message);
            });
        } else {
            return res.status(401).send({ message: "Oh, you cheeky bugger! You can't do that, unless you're signed in! I've got my eye on you!" });
        }
    });
}
