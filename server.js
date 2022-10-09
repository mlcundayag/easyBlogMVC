//import dependencies
const { urlencoded } = require('express');
const express = require('express');
//import sequelize connection
const sequelize = require('./config/connection');
//import routes
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//connect to routes
app.use(routes);

//sequelize server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on ${PORT}!`))
})
