const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth');

//get all blog
router.get('/', withAuth, async(req, res) => {
    try{
        const postData = await Post.findAll({
            where: {
               userID: req.session.userID
            },
            include: [User]
        });
        const allPost = postData.map((post) => post.get({ plain: true }));
        res.render('all-posts', {
            layout: 'dashboard',
            allPost
        });
    }
    catch(err) {
        res.redirect('login');
    }
});

//create new blog
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
    })
})

//edit blog
router.get('/edit/:id', withAuth, async(req, res) => {
    try{
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'bodyPost'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'bodyComment', 'postID', 'userID'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ],
        });
        if(postData){
            const allPost = postData.get({ plain: true });
            res.render('edit-post', {
                layout: 'dashboard',
                allPost
            })
        } else {
            res.status(404).end();
        }       
    }
    catch(err) {
        res.redirect('login');
    }
})

module.exports = router