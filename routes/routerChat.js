const { Router } = require('express')
const routes = Router()
const {getChat, getChatsByMail} = require("../controllers/chatController.js")

routes.get('/chat', getChat)
routes.get('/chat/:email', getChatsByMail)

module.exports = routes;