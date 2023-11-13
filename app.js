const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const io = require('socket.io-client')

// Reemplaza con la URL de tu servidor
const socket = io('https://nxsk39r2-1234.brs.devtunnels.ms/')

// Reemplaza con el puerto COM correcto
const port = new SerialPort({ path: 'COM10', baudRate: 9600 }, (err) => {
  if (err) {
    return console.log('Error al abrir el puerto serial:', err.message)
  }
})

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

socket.on('connect', () => {
  console.log('Conectado al servidor')
})

// Escucha los datos entrantes
parser.on('data', (data) => {
  console.log('Recibido:', data)
})

// Función para enviar datos
function enviarDatos (data) {
  port.write(data, (err) => {
    if (err) {
      return console.log('Error en enviar:', err.message)
    }
    console.log('Mensaje enviado:', data)
  })
}

socket.on('direction', (direction) => {
  if (!direction) {
    return console.log({ message: 'No se recibió el comando' })
  }

  enviarDatos(direction)

  console.log({ message: 'Comando recibido: ' + direction })
})

socket.on('disconnect', () => {
  console.log('Desconectado del servidor')
})
