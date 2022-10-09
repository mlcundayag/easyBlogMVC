const router = require('express').Router();

//import main routes
const apiRoutes = require('./api');
// const homeRoutes = require('./home-routes.js');
// const dashboardRoutes = require('./dashboard-routes.js');

//set up main routes
// router.use('/', homeRoutes);
// router.use('/blog', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;