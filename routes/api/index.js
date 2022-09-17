const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const auth = require("../auth");
const Model = require("../../model/model");
const { render } = require("ejs");

function getDateNow() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return (
    day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second
  );
}

// router.get("/", auth.optional, (req, res) => {
//   res.render("index");
// });

// router.get("/register", auth.optional, (req, res) => {
//   res.render("register");
// });

// router.get("/login", auth.optional, (req, res) => {
//   res.render("login");
// });

router.post("/register", auth.optional, async (req, res, next) => {
  const user = await Model.userData.findOne({ username: req.body.username });
  if (user != null) {
    res.status(400).json({ message: "User already exists" });
  } else {
    // Create a new User
    try {
      const user = new Model.userData({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
      });
      user.setPassword(req.body.password);
      await user.save();
      res.status(200).json({ user: user.toAuthJSON() });
      console.log("User created");
    } catch (err) {
      next(err);
    }
  }
});
// Refactored

router.post("/login", auth.optional, async (req, res, next) => {
  console.log("Login request");
  console.log(req.body.username);
  const user = await Model.userData.findOne({ username: req.body.username });
  console.log(user);
  if (user == null) {
    console.log("User does not exist");
    return res.status(400).json({ message: "User does not exist" });
  }
  if (!user.checkPassword(req.body.password)) {
    console.log("Password is incorrect");
    return res.status(400).json({ message: "Password is incorrect" });
  }

  return passport.authenticate("local", (err, passportUser, info) => {
    if (err) {
      console.log("Passport err");
      return next(err);
    }
    if (passportUser) {
      const user = passportUser;
      userJSON = user.toAuthJSON();
      res.cookie("user", userJSON);
      return res.status(200).json({ user: userJSON });
    } else {
      console.log("Passport error");
      return res.status(400).json({ message: "Error Occured" });
    }
  })(req, res, next);
});
// Refactored

router.post("/logout", auth.required, (req, res) => {

  res.clearCookie("user");
  req.session.destroy();
  res.status(200).json({ message: "Logout successful" });
});
  // Refactored

//get the journal entries for the user
router.get("/journalEntries", auth.required, async (req, res, next) => {
  const userJSON = req.cookies.user;

  const userDB = await Model.userData.findOne({ username: userJSON.username });

  if (userDB.validateJWT(userJSON.token)) {
    const journalEntries = await Model.journalEntry.find({
      user: userDB.username,
    }).sort({ date: -1 });
    res.status(200).json({ journalEntries: journalEntries });
  } else {
    res.status(400).json({ message: "Invalid token" });
    console.log("JWT is invalid");
  }
});
//Refactored


router.post("/addEntry", auth.required, async (req, res, next) => {
  const userJSON = req.cookies.user;
  const userDB = await Model.userData.findOne({ username: userJSON.username });

  if (userDB.validateJWT(userJSON.token)) {
    const entry = new Model.journalEntry({
      user: userDB.username,
      title: req.body.title,
      content: req.body.content,
      date: getDateNow(),
      updatedOn: getDateNow(),
    });
    entry.save();
    res.status(200).json({ message: "Entry added" });
  } else {
    res.status(400).json({ message: "Invalid token - authentication wasnt successfull" });
    console.log("JWT is invalid");
  }
});
//Refactored

router.delete("/deleteEntry/:id", auth.required, async (req, res, next) => {
  const userJSON = req.cookies.user;
  const userDB = await Model.userData.findOne({ username: userJSON.username });
  if (userDB.validateJWT(userJSON.token)) {
    const entry = await Model.journalEntry.findById(req.params.id);
    entry.remove();
    res.status(200).json({ message: "Entry deleted" });
  } else {
    res.status(400).json({ message: "Invalid token" });
    console.log("JWT is invalid");
  }
});
//Refactored

router.post("/editEntry/:id", auth.required, async (req, res, next) => {
  const userJSON = req.cookies.user;
  const userDB = await Model.userData.findOne({ username: userJSON.username });
  if (userDB.validateJWT(userJSON.token)) {
    const entry = await Model.journalEntry.findById(req.params.id);
    entry.title = req.body.title;
    entry.content = req.body.content;
    entry.updatedOn = getDateNow();
    entry.save();
    res.status(200).json({ message: "Entry edited" });
  } else {
    res.status(400).json({ message: "Invalid token" });
    console.log("JWT is invalid");
  }
});
//Refactored

router.get("/hi", auth.optional, (req, res) => {
  res.status(200).json({ message: "Hello" });
}); // to test if the server is running


module.exports = router;
