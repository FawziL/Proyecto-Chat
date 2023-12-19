const {chatService} = require("../services/index.js")

const getChatsByMail = async (req, res) => {
        try {
            const email = req.params.email
            const verChats = await chatService.getByEmail(email)
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

module.exports = {getChatsByMail, getChat};