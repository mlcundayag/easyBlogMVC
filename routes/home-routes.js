const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth')

//get all Post and render in on homepage
router.get('/', async(req, res) =>{
    try{
        const postData = await Post.findAll({
            include: [User],
        });
        //serialize data and render
        const allPost = postData.map((post) => post.get({ plain: true }));
        res.render('all-post', { allPost, loggedIn: req.session.loggedIn})
    }
    catch(err) {
        res.status(500).json(err);
    }
});

//click a post and shows comments
router.get('/post/:id', withAuth, async(req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            }, 
            include: [
            User, {
                model: Comment,
                include: [User],
            }
        ],
        });
        if(postData) {
            const singlePost = postData.get({ plain: true });
            res.render('single-post', { singlePost, loggedIn: req.session.loggedIn });
        } else {
            res.status(404).end()
        }
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//login route
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//create account page
router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return
    }
    res.render('signup');
});

module.exports = router