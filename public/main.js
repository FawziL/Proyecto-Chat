const socket = io()

const formMessage = document.querySelector('#formMessage')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

let username;

socket.on('server:username', receivedUsername => {
  username = receivedUsername;
});

function sendMessage() {
  try {
    const message = messageInput.value

    socket.emit('client:message', { username, message })
  } catch (error) {
    console.log(`Hubo un error ${error}`)
  }
}

function renderMessages(messagesArray) {
  try {
    if (messagesArray.length === 0) {
      return (messagesPool.innerHTML = `<div> No hay mensajes en el chat
       </div>`)
    }
    const html = messagesArray
      .map(messageInfo => {
        return `<div class="contenerdMessage">
                  <div class="gris">
                    <h2>${messageInfo.username}</h2>
                    <p>${messageInfo.message}</p>
                  </div>
                </div>`
      })
      .join(' ')

    messagesPool.innerHTML = html
  } catch (error) {
    console.log(`Hubo un error ${error}`)
  }
}

formMessage.addEventListener('submit', event => {
  event.preventDefault()
  sendMessage()
  messageInput.value = ''
})

socket.on('server:message', renderMessages)