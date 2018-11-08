const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    app.get('/sign-up', (req, res) => {
        res.render('sign-up');
    });
    app.post('/sign-up', (req, res) => {
        const user = new User(req.body);

        user
            .save()
            .then((user) => {
                var token = jwt.sign({ _id: user._id  }, process.env.SECRET, { expiresIn: "60 days" });
                res.cookie('nToken', token, { maxAge: 900000, httpOnly: true })
                res.redirect("/");
            })
            .catch(err => {
                console.log(err.message);
                return res.status(400).send({ err: err });
            });
    });
    app.get('/log-in', (req, res) => {
        res.render('log-in');
    });
    app.post('/log-in', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        //find the user
        User.findOne({ username }, 'username password')
            .then(user => {
                if(!user) {
                    //if user not found
                    return res.status(401).send({ message: "Wrong username or password" });
                }
                user.comparePassword(password, (err, isMatch) => {
                    if(!isMatch) {
                        return res.status(401).send({ message: "You're trying to sneak into someone else's account, you sneaky bastard! Go, before I release the hounds!" });
                    }
                    //create token for login
                    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                        expiresIn: "60 days"
                    });
                    //set cookie, redirect
                    res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
                    res.redirect('/');
                });
            })
            .catch(err => {
                console.log(err);
            });
    });
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });
};
