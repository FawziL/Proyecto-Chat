const { Router } = require("express");
const routes = Router();

const routerUser = require("./routerUser.js");
const routerChat = require("./routerChat.js");

routes.use(routerUser);
routes.use(routerChat);

module.exports = routes;
