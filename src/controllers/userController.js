const User = require('../models/User');

exports.login = (req, res) => {
    res.render('login');
};

exports.loginAction = (req, res) => {
    const auth = User.authenticate();

    auth(req.body.email, req.body.password, (error, result) => {
        if (!result) {
            req.flash('error', 'Your email and/or password are wrong.');
            return res.redirect('/users/login');
        }

        req.login(result, () => {});

        req.flash('success', 'Successfully login!');
        return res.redirect('/');
    });
};

exports.register = (req, res) => {
    res.render('register');
};

exports.registerAction = (req, res) => {
    const newUser = new User(req.body);

    User.register(newUser, req.body.password, (error) => {
        if (error) {
            req.flash('error', 'An error occurred, please try again later.');
            return res.redirect('/users/register');
        }

        req.flash('success', 'Successful registration. Please log in');
        res.redirect('/users/login');
    });
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};