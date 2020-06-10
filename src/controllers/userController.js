const User = require('../models/User');
const crypto = require('crypto');
const mailHandler = require('../handlers/mailHandler');

exports.login = (req, res) => {
    res.render('users/login');
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
    res.render('users/register');
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

exports.profile = (req, res) => {
    res.render('users/profile');
};

exports.profileAction = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { name: req.body.name, email: req.body.email },
            { new: true, runValidators: true }  
        );
    } catch (error) {
        req.flash('error', 'An error occurred: ' + error.message);
        return res.redirect('/profile');
    }

    req.flash('success', 'Data updated successfully');
    return res.redirect('/profile');
};

exports.forget = (req, res) => {
    return res.render('users/forget');
};

exports.forgetAction = async (req, res) => {
    const user = await User.findOne({email: req.body.email}).exec();

    if (!user) {
        req.flash('error', 'An email has been sent.'); //Prevent malicious users from seeing if there is an email registered in the application
        return res.redirect('/users/forget');
    }

    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; //1 hour
    await user.save();

    const resetLink = `http://${req.headers.host}/users/reset/${user.resetPasswordToken}`;

    const to = `${user.name} <${user.email}>`;
    const html = `Reset your password by clicking <a href="${resetLink}">here</a>.`;
    const text = `Reset your password: ${resetLink}.`;

    mailHandler.send({
        to: to,
        subject: 'Reset password',
        html: html,
        text: text,
    })

    req.flash('success', 'An email has been sent');
    return res.redirect('/users/login');
};

exports.forgetToken = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }).exec();

    if (!user) {
        req.flash('error', 'Expired token');
        return res.redirect('/users/forget');
    }

    return res.render('users/forgetPassword');
};

exports.forgetTokenAction = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }).exec();

    if (!user) {
        req.flash('error', 'Expired token');
        return res.redirect('/users/forget');
    }
    
    if (req.body.password != req.body['password-confirm']) {
        req.flash('error', "Passwords don't match");
        return res.redirect('back');
    }

    user.setPassword(req.body.password, async () => {
        await user.save();

        req.flash('success', 'Password changed successfully');
        return res.redirect('/');
    });
}