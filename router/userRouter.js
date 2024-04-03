const { v4 } = require("uuid");
const modelScheema = require("../model/userScheema");
const {
  checkUser,
  createUser,
  register,
  login,
  profile,
  checkLogin,
  logout,
 
} = require("../controller/userControlerr");
const passport = require("passport");
require("../config/passport-local");

const Router = require("express").Router();

Router.get("/profile", checkUser , profile);
Router.post("/login",checkLogin);
Router.get("/register",checkUser, register);
Router.get("/login", checkUser, login);
Router.post("/register", createUser);
Router.get("/logout", logout);

Router.use(passport.initialize());
Router.use(passport.session());

Router.get("/profile", profile);

module.exports = Router;
