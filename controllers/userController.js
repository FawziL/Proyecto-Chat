const path = require("path");

const getAcount = async (req, res) => {
  try {
    console.log(req.user);
    const { username, name, age, phone, avatar } = req.user;
    res.render("userInfo", { username, name, age, phone, avatar });
  } catch (error) {
    res.status(error.errorCode).send(error.message);
  }
};
const getUser = async (req) => {
  try {
    const { username } = req.user;
    return username;
  } catch (error) {
    console.error("Error en getUser:", error);
    return null;
  }
};

const login = async (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/account");
  } else {
    res.sendFile(path.join(__dirname, "../public/pages/login.html"));
  }
};
const failedLogin = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/faillogin.html"));
};
const signup = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/register.html"));
};
const failedSignup = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/failsignup.html"));
};
const logout = async (req, res, next) => {
  let user = req.user.username;
  req.logout(function (err) {
    if (err) return next(err);
    res.send(`<h1>Hasta luego ${user}</h1>
          <script type="text/javascript">
          setTimeout(function(){ location.href = '/login'},2000)
          </script>`);
  });
};

module.exports = {
  getAcount,
  signup,
  login,
  failedLogin,
  failedSignup,
  logout,
  getUser,
};
