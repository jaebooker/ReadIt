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
};
