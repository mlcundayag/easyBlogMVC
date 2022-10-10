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
router.put('/:id', withAuth, async(req, res) => {
    try {
        const updatePost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        if(updatePost) {
            res.json({ status: `Successfully updated post`})
            return;
        } else {
            res.status(404).json({ error: `Post not found`})
            return;
        }
    }
    catch (err) {
        res.status(500).json (err);
    }
})

//Delete Post
router.delete('/:id', withAuth, async(req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if(deletePost) {
            res.json({ status: `Successfuly deleted post`})
            return;
        } else {
            res.status(404).json({ error: `Post not found`})
            return;
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router