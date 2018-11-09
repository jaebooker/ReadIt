const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const Post = require('../models/post');
const Comment = require('../models/post');
const User = require('../models/user');
module.exports = function(app) {
    app.use(methodOverride('_method'))
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', (req, res) => {
    var currentUser = req.user;
    console.log(req.cookies);
    Post.find()
    .then(posts => {
        res.render('posts-index', { posts, currentUser });
    })
    .catch(err => {
        console.log(err);
    })
})
app.get("/category", function(req, res) {
  var currentUser = req.user;
  Post.find({ category: req.params.category })
    .then(posts => {
        res.render("post-index", { posts, currentUser });
    })
    .catch(err => {
        console.log(err);
    });
});
app.get('/posts/new', (req, res) => {
    var currentUser = req.user;
    res.render('posts-new', { currentUser });
})
app.post('/posts', (req, res) => {
    if (req.user) {
    const post = new Post(req.body);
    post.author = req.user._id;
    //save instance to data
    post.save()
    .then(post => {
        return User.findById(req.user._id);
    })
    .then(user => {
        user.posts.unshift(post);
        user.save();
        //take me to the new post
        res.redirect('/posts/' + post._id);
    })
    .catch(err => {
        console.log(err.message);
    });
    } else {
        return res.status(401).send({ message: "Oh, you cheeky bugger! You can't do that, unless you're signed in" });
    }
});
app.get('/posts/:id', (req, res) => {
    var currentUser = req.user;
    Post.findById(req.params.id).populate('comments').then((post) => {
        res.render('posts-show', { post, currentUser })
    }).catch((err) => {
        console.log(err.message);
    })
})
app.get('/posts/:id/edit', (req, res) => {
    var currentUser = req.user;
    Post.findById(req.params.id, function(err, post) {
        res.render('posts-edit', { post, currentUser });
    })
})
app.put('/posts/:id/', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
    .then(post => {
        res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
        console.log(err.message)
    })
})
app.delete('/posts/:id', function (req, res) {
  console.log("It is time for this post... to end")
  Post.findByIdAndRemove(req.params.id).then((post) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
};
