const express = require("express");
const { Server: HttpServer } = require("http");
const app = express();
const httpServer = new HttpServer(app);
const mongoose = require("mongoose");
const rutas = require("./routes/index.js");
const { engine } = require('express-handlebars');
const path = require('path')
const passport = require("passport");
const initPassport = require("./passport/init.js");

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

const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://FawziL:Zddx1v2hhlB7ux8f@agenda.2xefrlm.mongodb.net/',
    }),
    secret: "chats",
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {
      maxAge: 5000000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

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
  const passportSocketIo = require("passport.socketio");

  io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: 'connect.sid',
  secret: 'chats', // <-- Usa el mismo secret que en tu configuración de sesión
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://FawziL:Zddx1v2hhlB7ux8f@agenda.2xefrlm.mongodb.net/',
  }),
  success: onAuthorizeSuccess,
  fail: onAuthorizeFail,
}));

  io.on('connection', async socket => {
    if (!socket.request.user) {
      console.log('Intento de conexión no autorizado');
      return socket.disconnect(true);
    }
    const username = socket.request.user.username;
    console.log('Usuario autenticado:', username);

    socket.emit('server:username', username);
  
    const messages = await chatService.getChat()
    io.emit('server:message', messages)
  
    socket.on('client:message', async messageInfo => {

      const { username, message } = messageInfo;
      await chatService.createMessage(username, message)
      const messages = await chatService.getChat()
      io.emit('server:message', messages)
    })
  })

  function onAuthorizeSuccess(data, accept) {
    console.log('Autorización exitosa');
    accept(null, true);
  }
  
  function onAuthorizeFail(data, message, error, accept) {
    console.error('Error en la autorización:', message);
    accept(null, false);
  }
