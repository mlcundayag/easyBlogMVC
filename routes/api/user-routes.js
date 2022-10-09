const router = require('express').Router();
const { restart } = require('nodemon');
const { User } = require('../../models');

//create user 
router.post('/', async (req, res) => {
    let newUserData = {
        username: req.body.username,
        password: req.body.password
    }
    try {
        const newUser = await User.create(newUserData);
        //save data to session
        req.session.save(() => {
            req.session.userID = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.json(newUser);
        });
    }
    catch(err) {
        res.status(500).json(err);
    }
});

//user login
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({
            where: {
                username: req.body.username
            },
        });
        //if there's no user found
        if (!user) {
            res.status(400).json({ message: `User not found!\nLogin with valid username or create account!`});
            return;
        }
        //check for password
        const validPassword = user.checkPassword(req.body.password);
        if(!validPassword){
            res.status(400).json({ message: `User not found!\nLogin with valid username or create account!`});
            return;
        }
        req.session.save(() => {
            req.session.userID = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json({ user, message: `Success! Welcome back ${user.username}` });
        })
    }
    catch (err) {
        res.status(400).json({ message: `User not found!\nLogin with valid username or create account!` })
    }
});

//user logs out
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
            res.json({ message: `Successfully logged out!` });
        });
    } else {
        res.status(404).end()
    }
})

module.exports = router
