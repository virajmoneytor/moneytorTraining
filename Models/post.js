// const Sequelize = require('sequelize');
// const User = require('./user');


// const Post = sequelize.define('post', {
//     text: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     userId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//     likeCount: {
//       type: Sequelize.INTEGER,
//       allowNull: false
//     },
//   },{tableName:'posts'});

//   Post.belongsTo(User, { foreignKey: "userId" });

//   // check if the user table already exists
//   Post.describe().then(() => {
//       // console.log('User table already exists');
//     }).catch(() => {
//       // create the user table if it does not exist
//       Post.sync().then(() => {
//         console.log('User table created');
//       }).catch(err => {
//         console.error('Error creating user table', err);
//       });
//     });


//     module.exports = Post