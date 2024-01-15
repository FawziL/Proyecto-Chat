const { Router } = require('express')
const routes = Router()
const {getChat, getChatsByUsername} = require("../controllers/chatController.js")

routes.get('/chat', getChat)
routes.get('/chat/:email', getChatsByUsername)

module.exports = routes;