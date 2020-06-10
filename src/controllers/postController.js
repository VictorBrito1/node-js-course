const mongoose = require('mongoose');
const slug = require('slug');
const Post = mongoose.model('Post');

exports.add = (req, res) => {
    res.render('posts/postAdd');
};

exports.addAction = async (req, res) => {
    req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    req.body.author = req.user._id;
    const post = new Post(req.body);

    try {
        await post.save();
    } catch (error) {
        req.flash('error', 'An error occurred: ' + error.message);
        return res.redirect('/post/add');
    }

    req.flash('success', 'Post saved successfully');

    res.redirect('/');
};

exports.edit = async (req, res) => {
    const post = await Post.findOne({slug: req.params.slug});

    res.render('posts/postEdit', {post});
};

exports.editAction = async (req, res) => {
    req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    req.body.slug = slug(req.body.title, {lower: true});

    try {
        const post = await Post.findOneAndUpdate(
            {slug: req.params.slug}, 
            req.body,
            {
                new: true, //Return updated post
                runValidators: true,
            }
        );
    } catch (error) {
        req.flash('error', 'An error occurred: ' + error.message);
        return res.redirect('/post/' + req.params.slug + '/edit');
    }

    req.flash('success', 'Post updated successfully');

    res.redirect('/');
};

exports.show = async (req, res) => {
    const post = await Post.findOne({slug: req.params.slug});

    res.render('posts/postShow', { post });
};