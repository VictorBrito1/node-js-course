const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let obj = {
        pageTitle: 'Home',
        name: 'Victor',
        age: 21,
        show: true,
        ingredients: [
            {name: 'Rice', amount: '500g'},
            {name: 'Spaghetti', amount: '300g'}
        ],
        interests: ['node', 'js', 'css'],
    };

    res.render('home', obj);
});

router.get('/about-us', (req, res) => {
    res.send('ABOUT US Page');
});

router.get('/posts/:slug', (req, res) => {
    let slug = req.params.slug;

    res.send('Slug: ' + slug);
});

module.exports = router;