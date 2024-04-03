const { Strategy } = require("passport-local");
const UserOne = require("../model/userScheema");
const passport = require("passport");
const bcrypt = require("bcrypt");

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await UserOne.findOne({ email: email });
      if (!user) {
        console.log(" incorrect user");
        return done(null, false);
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (!result) {
            console.log("incorrect password");
            return done(null, false);
          } else {
            console.log("login Successed");
            return done(null, user);
          }
        });
      }
    }
  )
);

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await UserOne.findOne({ id: id });
//   if (user) {
//      done(null, user);
//   }else
//   {
//      done(null, false);
//   }
// });



// create session id
// whenever we login it creares user id inside session
passport.serializeUser((user, done) => {
  done(null, user.email);
});

// find session info using session id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserOne.findOne({email:id});
    console.log(user.name);
    done(null, user);
  } catch (error) {
    console.log("Err");
    done(error, false);
  }
});