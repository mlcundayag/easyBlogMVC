const router = require('express').Router();

//main api routes
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const postRoutes = require('./post-routes');

//set up main routes
router.use('/user', userRoutes);
// router.use('/comment', commentRoutes);
// router.use('/post', postRoutes);

module.exports = router;