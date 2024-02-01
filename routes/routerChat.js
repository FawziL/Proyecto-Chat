const { Router } = require("express");
const routes = Router();
const {
  renderChat,
  getChatsByUsername,
} = require("../controllers/chatController.js");
const auth = require("../middlewares/isAuth");

routes.get("/chat", auth, renderChat);
routes.get("/chat/:username", getChatsByUsername);

module.exports = routes;
