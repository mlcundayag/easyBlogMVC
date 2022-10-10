const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth')

//create Post
router.post('/', withAuth, async(req, res) => {
    let newPostData = {
        title: req.body.title,
        bodyPost: req.body.bodyPost,
        userID: req.session.userID
    }
    try {
        const newPost = await Post.create(newPostData)
        res.json(newPost)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//update Post
// router.put('/:id')

module.exports = router