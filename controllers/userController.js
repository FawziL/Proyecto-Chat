const path = require('path')

const home = async (req, res) => {
    res.redirect('/chat')
}

const getAcount = async (req, res) => {
  const {email, name, address, age, phone, avatar} = req.user
  res.render('userInfo',{email, name, address, age, phone, avatar})
};
const chat = async (req, res) => {
  const {name, avatar} = req.user
  res.render('chat',{name, avatar})
};

module.exports =  {home, getAcount, chat}



