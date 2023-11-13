const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.disable('x-powered-by')

// Ejemplo de envío de datos
app.post('/post', (req, res) => {
  const { direction } = req.body
  console.log(direction)

  if (!direction) {
    return res.status(400).send({ message: 'No se recibió el comando' })
  }

  res.status(200).send({ message: 'Comando recibido: ' + direction })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`)
})
