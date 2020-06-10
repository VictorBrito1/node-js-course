exports.isLogged = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', "You don't have access to this page.");
        return res.redirect('/users/login');
    }

    next();
};

exports.changePassword = (req, res) => {
    if (req.body.password != req.body['password-confirm']) {
        req.flash('error', "Passwords don't match");
        return res.redirect('/profile');
    }

    req.user.setPassword(req.body.password, async () => {
        await req.user.save();

        req.flash('success', 'Password changed successfully');
        return res.redirect('/');
    });
};