//import dependencies
const express = require('express');
const exphbs = require('express-handlebards');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// connect routes and sequelize
const sequelize = require('./config/connection');
const routes = require('./routes');

//create connect helpers

const hbs = exphbs.create({ helpers });

//connection session
const sess = {
    secret: 'super secret secret',
    cookie: {},
    resave: false,
    saveUninitiliazed: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//initialize server
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use(session(sess));

//use routes
app.use(routes);

//set handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//sequelize server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on ${PORT}!`))
})
