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
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    // Create a new User
    try {
      const user = new Model.userData({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
      });
      await user.save();
      user.setPassword(req.body.password);
      res.status(200).json({ user: user.toAuthJSON() });
      console.log("User created");
    } catch (err) {
      next(err);
    }
  }
});
// Survivor

router.post("/login", auth.optional, async (req, res, next) => {
  const user = await Model.userData.findOne({ username: req.body.username });
  if (!user) {
    res.redirect("/register", { error: "User does not exist" });
    console.log("User does not exist");
  }
  if (!user.checkPassword(req.body.password)) {
    console.log("Password is incorrect");
    res.redirect("/login");
  }

  return passport.authenticate("local", (err, passportUser, info) => {
    if (err) {
      return next(err);
    }
    if (passportUser) {
      const user = passportUser;
      userJSON = user.toAuthJSON();
      // add the token to the cookie
      res.cookie("userJSON", userJSON);
      res.redirect("/journalEntries");
    } else {
      return res.redirect("/login");
    }
  })(req, res, next);
});
//Survivor

router.post("/logout", auth.required, (req, res) => {
  res.clearCookie("userJSON");
  req.session.destroy();
  res.redirect("/");
});
//Survivor

//get the journal entries for the user
router.get("/journalEntries", auth.required, async (req, res, next) => {
  const userJSON = req.cookies.userJSON;
  const userDB = await Model.userData.findOne({ username: userJSON.username });

  if (userDB.validateJWT(userJSON.token)) {
    const journalEntries = await Model.journalEntry.find({
      user: userDB.username,
    });

    res.render("journalEntries", {
      entries: journalEntries,
      currentUser: userDB,
    });
  } else {
    res.redirect("/login");
    console.log("JWT is invalid");
  }
});
//Survivor with modifications

// router.get("/userPortal", auth.required, async (req, res, next) => {
//   const userJSON = req.cookies.userJSON;
//   const userDB = await Model.userData.findOne({ username: userJSON.username });
//   if (userDB.validateJWT(userJSON.token)) {
//     res.render("userPortal", { currentUser: userDB });
//   } else {
//     res.redirect("/login");
//     console.log("JWT is invalid");
//   }
// });

router.post("/addEntry", auth.required, async (req, res, next) => {
  const userJSON = req.cookies.userJSON;
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
    res.redirect("/journalEntries");
  } else {
    res.redirect("/login");
    console.log("JWT is invalid");
  }
});
//Survivor

router.delete("/deleteEntry/:id", auth.required, async (req, res, next) => {
  const userJSON = req.cookies.userJSON;
  const userDB = await Model.userData.findOne({ username: userJSON.username });
  if (userDB.validateJWT(userJSON.token)) {
    const entry = await Model.journalEntry.findById(req.params.id);
    entry.remove();
    res.redirect("/journalEntries");
  } else {
    res.redirect("/login");
    console.log("JWT is invalid");
  }
});
//Survivor

// router.get("/editEntry/:id", auth.required, async (req, res, next) => {
//   const userJSON = req.cookies.userJSON;
//   const userDB = await Model.userData.findOne({ username: userJSON.username });
//   if (userDB.validateJWT(userJSON.token)) {
//     const entry = await Model.journalEntry.findById(req.params.id);
//     res.render("editEntry", { entry: entry, currentUser: userDB });
//   } else {
//     res.redirect("/login");
//     console.log("JWT is invalid");
//   }
// });

router.post("/editEntry/:id", auth.required, async (req, res, next) => {
  const userJSON = req.cookies.userJSON;
  const userDB = await Model.userData.findOne({ username: userJSON.username });
  if (userDB.validateJWT(userJSON.token)) {
    const entry = await Model.journalEntry.findById(req.params.id);
    entry.title = req.body.title;
    entry.content = req.body.content;
    entry.updatedOn = getDateNow();
    entry.save();
    res.redirect("/journalEntries");
  } else {
    res.redirect("/login");
    console.log("JWT is invalid");
  }
});
//Heavy refactoring needed

module.exports = router;
