const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const Post = require('../models/post');
module.exports = function(app) {
    app.use(methodOverride('_method'))
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', (req, res) => {
    Post.find()
    .then(posts => {
        res.render('posts-index', { posts: posts });
    })
    .catch(err => {
        console.log(err);
    })
})
app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
})
app.post('/posts', (req, res) => {
    Post.create(req.body).then((post) => {
        res.redirect('/')
        //res.redirect(`/posts/${post._id}`);
    }).catch((err) => {
        console.log("...uh-oh")
        console.log(err.message);
    })
})
app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).then((post) => {
        res.render('posts-show', { post: post })
    }).catch((err) => {
        console.log(err.message);
    })
})
app.get('/posts/:id/edit', (req, res) => {
    Post.findById(req.params.id, function(err, post) {
        res.render('posts-edit', { post: post });
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
