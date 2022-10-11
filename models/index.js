//import models
const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post')

//set up relationships for User
User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

//set up relationship for Comment
Comment.belongsTo(User, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
});
Comment.belongsTo(Post, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

//set up relation for Post
Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
  });

module.exports = {
    User,
    Comment,
    Post
};