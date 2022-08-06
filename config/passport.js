const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const Model = require("../model/model.js");

passport.use(new LocalStrategy({ 
    usernameField: "username", 
    passwordField: "password"
},
    function (username, password, done) {
        Model.userData.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
            if (!user.checkPassword(password)) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, user);
        }
        );
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Model.userData.findById(id, function (err, user) {
        done(err, user);
    }
    );
});
