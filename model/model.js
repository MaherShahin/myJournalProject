const mongoose = require("mongoose");
var crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { isBuffer } = require("util");

// User Data Model Schema
const userDataScheme = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
});

userDataScheme.methods.setPassword = function (password) {
  this.password = crypto.createHash("sha256").update(password).digest("base64");
};

userDataScheme.methods.checkPassword = function (password) {
  return (
    crypto.createHash("sha256").update(password).digest("base64") ===
    this.password
  );
};


// JWT Tokens
userDataScheme.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    "secret"
  );
};

userDataScheme.methods.validateJWT = function (token) {
  // Check that the JWT Token is valid
  try {
    const decoded = jwt.verify(token, "secret");
    if (Date.now() >= decoded.exp * 1000) {
      return false;
    }
    if (decoded.username === this.username) {
      return true;
    }
  } catch (err) { 
    return false;
  }
};

userDataScheme.methods.toAuthJSON = function () {
  return {
    username: this.username,
    token: this.generateJWT(),
  };
};

var userData = mongoose.model("userData", userDataScheme, "users");
var journalEntry = mongoose.model("journalEntry", journalEntryScheme, "journalEntries");


// Journal Entries Model Schema
const journalEntryScheme = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String },
  updatedOn: { type: String },
  user: { type: String, required: true },
});

var journalEntry = mongoose.model(
  "journalEntry",
  journalEntryScheme,
  "journalEntries"
);

module.exports = {
  userData,
  journalEntry,
};
