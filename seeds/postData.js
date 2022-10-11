const { Post } = require('../models');

const postData = [
    {
      "postTitle": "Language",
      "postContent": "HTML, CSS, JAVASCRIPT all day!",
      "userId": 2
    },
    {
      "postTitle": "Journey",
      "postContent": "Part of the journey is the end. CodeBootcamps are difficult but fun.",
      "userId": 1
    },
    {
      "postTitle": "CodeHero",
      "postContent": "I choose to run towards my problems and not away from them, because what real coders do...",
      "userId": 3
    }
  ]

  const seedPost = () => Post.bulkCreate(postData);

  module.exports = seedPost