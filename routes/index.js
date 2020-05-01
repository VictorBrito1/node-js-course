const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/about-us', (req, res) => {
    res.send('ABOUT US Page');
});

router.get('/posts/:slug', (req, res) => {
    let slug = req.params.slug;

    res.send('Slug: ' + slug);
});

module.exports = router;