let LocalStrategy = require("passport-local").Strategy;
let bCrypt = require("bcrypt");
const User = require("../models/userModel.js");

module.exports = function (passport) {
  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          console.log("Comprobando credenciales");
          const user = await User.findOne({ username: username });
          if (!user || !isValidPassword(user, password)) {
            return done(false);
          }
          console.log("Se ha encontrado al usuario");
          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
  //Desencriptar password
  function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
  }
};
