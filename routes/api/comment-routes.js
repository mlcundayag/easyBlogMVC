const router = require('express').Router();
const { Comment, User } = require('../../models/');
const withAuth = require('../../utils/auth');

//get comment
router.get('/', withAuth, async (req, res) =>{
    try{
        const commentData = await Comment.findAll({
            include: [User]
        });
        //serialization of comments
        const commentAll = commentData.map((comment) => comment.get({ plain: true }));
        res.render('all', {commentAll, loggedIn: req.session.loggedIn });

    }
    catch(err) {
        res.status(500).json(err);
    }
});

//post comment