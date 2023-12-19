const DaoChat = require("../daos/ChatDaoMongoDb.js");
const Chat = DaoChat.getInstance();


const getChat = async () => {
    try {
        const chats = await Chat.getAll()
        return chats
    } catch (error) {
        logger.error(`No estás autenticado: ${error}`)}
}

const getByEmail = async (email) => {
    return await Chat.getByEmail(email)
}
const createMessage = async(email, message) => {
    try {
        const userMessage = await Chat.create(email, message)
        return userMessage
    } catch (error) {
      throw new CustomError(500, error);
    }           
  }

module.exports =  {getChat, getByEmail, createMessage}