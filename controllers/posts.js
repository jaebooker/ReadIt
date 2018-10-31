const methodOverride = require('method-override');
const bodyParser = require('body-parser');
module.exports = function(app) {
    app.get('/', (req, res) => {
    res.render('posts-index', {});
})
app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
})
};
