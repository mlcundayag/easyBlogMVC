const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

// get blog
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { "userId": req.session.userId },
      include: [User]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('all-posts', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

//create new blog
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

//edit blog by id
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });
      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;