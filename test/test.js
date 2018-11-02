const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const Post = require('../models/post');

const samplePost = {
    "title": "Best Ways To Cook A Human",
    "subTitle": "For those interested",
    "autor": "An unashamed cannibal",
    "summary": "Here are the best cooking practices when eating tasty, healthy,\
     gluton-free humans.",
    "upvotes": "7"
}

chai.use(chaiHttp);

describe('Posts', ()  => {

    after(() => {
      Post.deleteMany({title: 'Best Ways To Cook A Human'}).exec((err, posts) => {
        console.log(posts)
        posts.remove();
      })
    });
  it('should get all the posts', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
  it('should open post form', (done) => {
    chai.request(server)
        .get('/posts/new')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
  it('should post new article', (done) => {
    var post = new Post(samplePost);
    post.save((err, data) => {
    chai.request(server)
        .post('/posts')
        .send(samplePost)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
  });
});
