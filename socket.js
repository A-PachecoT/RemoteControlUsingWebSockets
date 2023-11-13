const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
app.use(cors())
app.use(express.json())
app.disable('x-powered-by')

// Crear un servidor HTTP a partir de la aplicación Express
const server = http.createServer(app)

// Inicializar una nueva instancia de Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // CORS
    methods: ['POST']
  }
})

// Manejar la conexión de un cliente a Socket.IO
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado')

  // Recibir mensajes de los clientes y retransmitirlos
  socket.on('direction', (direction) => {
    console.log('Dirección recibida:', direction)
    io.emit('direction', direction) // Emitir a todos los clientes
  })

  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado')
  })
})

// Opcional: Mantener tu endpoint POST, si todavía lo necesitas
app.post('/post', (req, res) => {
  const { direction } = req.body
  console.log(direction)

  if (!direction) {
    return res.status(400).send({ message: 'No se recibió el comando' })
  }

  // Retransmitir a través de Socket.IO
  io.emit('direction', direction)

  res.status(200).send({ message: 'Comando recibido: ' + direction })
})

const PORT = process.env.PORT ?? 1234
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
