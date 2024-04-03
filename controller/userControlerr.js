const passport = require("passport");
const modelScheema = require("../model/userScheema");

const bcrypt = require("bcrypt");
const path = require("path");
const salt = 10;

const register = (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/../views/register.html"));
};

const login = (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/../views/login.html"));
};

const checkUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.sendFile(path.join(__dirname + "/../views/profile.html"));
  }
  next();
};

//login:post
const checkLogin = (req, res, next) => {
  passport.authenticate(
    "local",
    // (err,user)=>{
    //   if(user){
    //     console.log(user);
    //     res.redirect("/account/profile")
    //   }else{

    //     res.redirect("/account/login")
    //   }
    //   if(err){
    //     console.log(err);
    //   }
    // }
    {
      failureRedirect: "/account/login",
      successRedirect: "/account/profile",
      failureFlash: true,
    }
  )(req, res, next);
};

//check login or not

const logout = (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      } else {
        res.redirect("/");
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//prfile: get
const profile = (req, res) => {
  res.redirect("/account/login");
};
//register : post
const createUser = async (req, res) => {
  const { email, name, password, agianPassword } = req.body;
  const userOne = await modelScheema.findOne({ email: email });
  if (userOne) {
    res.status(200).send("email already used");
  } else {
    if (password == agianPassword) {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = new modelScheema({
          email,
          name,
          password: hash,
        });
        await user.save();
        res.status(201).redirect("/account/login");
        res.end();
      });
    } else {
      res.status(200).send("mismatch password");
    }
  }
};

// const loginUser = async (req, res) => {
//   passport.authenticate("local", {
//     failureRedirect: "/account/login",
//     successRedirect: "/account/profile",
//   });

//   // const { email, password } = req.body;
//   // const userOne = await modelScheema.findOne({ email: email });

//   // if (userOne) {
//   //   bcrypt.compare(password, userOne.password, (err, result) => {
//   //     if (result) {
//   //       res.status(200).render("profile");
//   //     } else {
//   //       res.status(400).send("password is incurrect");
//   //     }
//   //   });
//   // } else {
//   //   res.status(404).send("your are not registert");
//   // }
// };

module.exports = {
  checkUser,
  createUser,
  register,
  login,
  checkLogin,
  profile,
  logout,
};
