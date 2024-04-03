const { config } = require("./config/config");
const express = require("express");
const Router = require("./router/userRouter");
const app = express();
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

require("./config/passport-local");
require("ejs");
require("./model/dbConnect");

app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: config.db.url,
      collectionName: "session",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).render("index");
});
app.use("/account", Router);

app.use((req, res) => {
  res.status(404).send(404);
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = app;
