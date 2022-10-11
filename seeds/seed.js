const sequelize = require('../config/connection');

const seedUser = require('./userData');
const seedPost = require('./postData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUser()
  console.log('\n----- USERS SEEDED -----\n');

  await seedPost()
  console.log('\n----- POSTS SEEDED -----\n');


  process.exit(0);
};

seedDatabase();
