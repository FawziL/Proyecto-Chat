module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("Usuario autenticado:", req.user);
    next();
  } else {
    res.redirect("/login");
  }
};
