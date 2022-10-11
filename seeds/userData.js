const { User } = require('../models');

const userData = [
    {
        "id" : 1,
        "username": "Tony",
        "password": "IamIronMan"
    },
    {   
        "id" : 2,
        "username": "Steve",
        "password": "AvengersAssemble"
    },
    {
        "id" : 3,
        "username": "Thor",
        "password": "mjolnirStormbreaker"
    }
];

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUser