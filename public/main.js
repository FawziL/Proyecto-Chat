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
        const isMyMessage = (messageInfo.username === username);
        const messageClass = isMyMessage ? 'my-message' : 'other-message';
        const bm = isMyMessage ? 'border-radius: 15px 0px 20px 15px;' : 'border-radius: 0px 15px 15px 20px;';

        const fecha = new Date(messageInfo.timestamp);
        const horas = fecha.getHours();
        const minutos = fecha.getMinutes();
        const horaFormateada = `${horas}:${minutos}`;

        return `<div class="${messageClass}">
                  <div class="gris" style="${bm}">
                    <h2>${messageInfo.username}</h2>
                    <p class="message">${messageInfo.message}</p>
                    <p class="hora">${horaFormateada}</p>
                  </div>
                </div>`
      })
      .join(' ')

    messagesPool.innerHTML = html;
    const lastMessage = messagesPool.lastElementChild;
    if (lastMessage) {
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end'});
    }
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