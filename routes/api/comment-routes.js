const router = require('express').Router();
const { Comment, User } = require('../../models/');
const withAuth = require('../../utils/auth');

//get comment
router.get('/', withAuth, async (req, res) =>{
    try{
        const commentData = await Comment.findAll({
            include: [User],
        });
        //serialization of comments
        const commentAll = commentData.map((comment) => comment.get({ plain: true }));
        res.render('all', { commentAll, loggedIn: req.session.loggedIn });
    }
    catch(err) {
        res.status(500).json(err);
    }
});

//post comment
router.post('/', withAuth, async (req, res) => {
    let newCommentData = {
        bodyComment: req.body.bodyComment,
        postID: req.body.postID,
        userID: req.session.userID 
    }
    try{
        const newComment = await Comment.create(newCommentData);
        res.json(newComment);
    }
    catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router