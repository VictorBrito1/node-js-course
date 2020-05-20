exports.userMiddleware = (req, res, next) => {
    let info = {id: 1, name: 'Victor'};

    req.userInfo = info;

    next();
}

exports.index = (req, res) => {
    let obj = {
        pageTitle: 'Home',
        userInfo: req.userInfo,
        age: 21,
        show: true,
        ingredients: [
            {name: 'Rice', amount: '500g'},
            {name: 'Spaghetti', amount: '300g'}
        ],
        interests: ['node', 'js', 'css'],
    };

    res.render('home', obj);
}