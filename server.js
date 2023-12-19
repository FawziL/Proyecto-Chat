const express = require("express");
const { Server: HttpServer } = require("http");
const app = express();
const httpServer = new HttpServer(app);
const mongoose = require("mongoose");
const rutas = require("./routes/index.js");
const { engine } = require('express-handlebars');
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
.connect('mongodb+srv://FawziL:Zddx1v2hhlB7ux8f@agenda.2xefrlm.mongodb.net/')
.then(() => {
  console.log('¡Conexión exitosa a la base de datos!');
})
.catch((error) => {
  console.error('Error al conectar a la base de datos:', error.message);
});

app.use("/", rutas);
app.use(express.static('public'))

app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: path.join(__dirname, "/public/views/layout/main.hbs"),
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
    })
);
app.set('view engine', '.hbs');
app.set("views", path.join(__dirname, "./public/views"));


const server = httpServer.listen(8080, () => {
  console.log(`Servidor escuchando: ${8080}`);
});

  const {chatService} = require("./services/index.js")
  const {Server: IOServer} = require('socket.io')
  const io = new IOServer(server)

  io.on('connection', async socket => {
    console.log(`Se conecto un usuario ${socket.id}`)
    const messages = await chatService.getChat()
  
    io.emit('server:message', messages)
  
    socket.on('client:message', async messageInfo => {
      const { email, message } = messageInfo;
      await chatService.createMessage(email, message)
      const messages = await chatService.getChat()
      io.emit('server:message', messages)
    })
  })
