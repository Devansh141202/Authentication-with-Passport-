const express = require("express");
const app = express();
const { connectMongoose } = require("./db");
const { User } = require("./schema");
const ejs = require("ejs");
const passport = require("passport");
const { initializingPassport } = require("./passport");

connectMongoose();

initializingPassport(passport);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) {
    return res.status(400).send("User already exist");
  }
  const newUser = await User.create(req.body);
  res.status(201).send(newUser);
  //   res.send("in reg.");
});

app.listen(3000, () => {
  console.log("server is listening on 3000");
});
