const LocalStrategy = require("passport-local").Strategy;
const bCrypt = require("bcrypt");
const User = require("../models/userModel.js");

module.exports = function (passport) {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const existingUser = await User.findOne({ username: username });
          if (existingUser) return done(null, false, "Ya existe el usuario");
          const newUser = {
            username: req.body.username,
            password: hashPassword(password),
            name: req.body.name,
            age: req.body.age,
            phone: req.body.phone,
          };

          const createdUser = await User.create(newUser);
          return done(null, createdUser);
        } catch (err) {
          console.log(err);
          done(err);
        }
      }
    )
  );

  // Encriptar password usando bCrypt
  function hashPassword(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }
};
