const login = require("./login.js");
const signup = require("./signup.js");

module.exports = function (passport) {
  signup(passport);
  login(passport);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Llamando Passport Strategies para Login y SignUp/Registration
};
