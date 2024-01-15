const {chatService} = require("../services/index.js")

const getChatsByUsername = async (req, res) => {
        try {
            const username = req.params.username
            const verChats = await chatService.getByUsername(username)
            if(verChats.length === 0){
                return res.status(404).json({error: "No existen chats"})}
            res.status(200).json(verChats)
        } catch (error) {
            res.status(error.errorCode).send(error.message); 
        }
}
const getChat = async (req, res) => {
    res.render('chats')
}
const newMessage = async (req, res) => {
    try {
        console.log(req.user)
        const {username} = req.user
        const newMessage = await chatService.createMessage(username, message)
    } catch (error) {
        res.status(error.errorCode).send(error.message); 
    }
}
module.exports = {getChatsByUsername, getChat};