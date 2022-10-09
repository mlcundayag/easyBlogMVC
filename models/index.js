//import models
const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post')

//set up relationships for User
User.hasMany(Post, { foreignKey: 'userID' });
User.hasMany(Comment, { foreignKey: 'userID' });

//set up relationship for Comment
Comment.belongsTo(User, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
});
Comment.belongsTo(Post, {
    foreignKey: 'postID',
    onDelete: 'CASCADE'
});

//set up relation for Post
Post.belongsTo(User, {
    foreignKey: 'userID',
    onDelete: 'CASCADE'
});
Post.hasMany(Comment, { foreignKey: 'postID'});

module.exports = {
    User,
    Comment,
    Post
}