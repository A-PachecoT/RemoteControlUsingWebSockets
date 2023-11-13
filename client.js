const io = require('socket.io-client')

// Reemplaza con la URL de tu servidor
const socket = io('http://localhost:1234')

socket.on('connect', () => {
  console.log('Conectado al servidor')
})

// Escucha el evento 'direction' y registra los datos recibidos
socket.on('direction', (direction) => {
  console.log('Dirección recibida:', direction)
})

socket.on('disconnect', () => {
  console.log('Desconectado del servidor')
})
