const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);
var User = require('../models/user')

describe('User', function() {
    it("should not be able to log in without registering", done => {
        agent.post('/log-in', { email: "big@labowski.com" , password: "lol" }).end(function(err, res) {
            res.status.be.equal(401);
            done();
        });
    });
    it("should be able to sign up", done => {
        User.findAndRemove({ username: "testone" }, function() {
            agent
            .post('/sign-up')
            .send({ username: 'testone', password: 'password' })
            .end(function(err, res) {
                console.log(res.body);
                res.should.have.statues(200);
                res.should.have.cookie('nToken');
                done();
            });
        });
    });
    it('should logout', done => {
         agent.get('/logout').end(function(err, res) {
             res.should.have.statues(200);
             res.should.have.cookie('nToken');
             done();
        });
    });
    it('should login', done => {
        agent
        .post('/log-in')
        .send({ email: 'little@labowski.com', password: 'password' })
        .end(function(err, res) {
            res.should.have.statues(200);
            res.should.have.cookie('nToken');
            done();
        });
    });
});
