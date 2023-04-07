const User = require('../Models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const passport = require('passport');


passport.use(new LocalStrategy(
    // function(username, password, done) {
    //   User.findOne({ username: username }, function (err, user) {
    //     if (err) { return done(err); }
    //     if (!user) { return done(null, false); }
    //     if (!user.verifyPassword(password)) { return done(null, false); }
    //     return done(null, user);
    //   });
    // }
    {usernameField:'username'},(username,password,done)=>{
        User.User.findOne({where:{username:username}}).then(async(user)=>{

          if(!user){
            return done(null,false,{message:'user not found'})
          }

        //   const match = await bcrypt.compare(password, user.password);

          bcrypt.compare(password, user.password,(err,isMatch)=>{
            if(err) throw err

            if(isMatch){
              return done(null,user)
            }else{
              return done(null,false,{message:'Password is incorrect'})
            }
          });

        }).catch(err => console.log(err))
    }
  ));

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(function(id, done) {
//     User.findOne({where:{id}},function(err, user) {
//         done(err, user);
//       })

//     // User.findBypk(id, function(err, user) {
//     //   done(err, user);
//     // });
//   });
  
  // Serialize the user for storage in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
    try {
        // Find the user in the database by ID
        const user = await User.User.findByPk(id);

        // If the user doesn't exist, return an error
        if (!user) {
            return done(new Error("User not found"));
        }

        // Otherwise, return the user object
        return done(null, user);

    } catch (err) {
        return done(err);
    }
});
  