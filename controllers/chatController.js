const { chatService } = require("../services/index.js");
const path = require("path");

const getChatsByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const verChats = await chatService.getByUsername(username);
    if (verChats.length === 0) {
      return res.status(404).json({ error: "No existen chats" });
    }
    res.status(200).json(verChats);
  } catch (error) {
    res.status(error.errorCode).send(error.message);
  }
};
const renderChat = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/chat.html"));
};
const getChat = async (req, res) => {
  const chats = await chatService.getChat();
  return chats;
};
module.exports = { getChatsByUsername, renderChat, getChat };
