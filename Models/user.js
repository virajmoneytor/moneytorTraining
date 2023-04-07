const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs')
const sequelize = new Sequelize('my_db', 'viraj', 'viraj123', {
  host: 'localhost',
  dialect: 'mysql',
  //   user:'viraj',
  //   password:'viraj123'
});

// define User model
const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { tableName: 'users' });


const Post = sequelize.define('post', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  likeCount: {
    type: Sequelize.INTEGER,  
    allowNull: false
  },
  likeIds: {
    type: Sequelize.JSON,
    allowNull: true,
  }
}, { tableName: 'posts' });

Post.belongsTo(User, { foreignKey: "userId" });


// hash password
User.beforeCreate(async (user)=>{
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
})

// check if the user table already exists
Post.describe().then(() => {
  // console.log('User table already exists');
}).catch(() => {
  // create the user table if it does not exist
  Post.sync().then(() => {
    console.log('User table created');
  }).catch(err => {
    console.error('Error creating user table', err);
  });
});

// check if the user table already exists
User.describe().then(() => {
  // console.log('User table already exists');
}).catch(() => {
  // create the user table if it does not exist
  User.sync().then(() => {
    console.log('User table created');
  }).catch(err => {
    console.error('Error creating user table', err);
  });
});


// export the User model
module.exports = {
  User: User,
  Post: Post
};
