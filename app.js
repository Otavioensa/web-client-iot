
const bodyParser = require('body-parser')
const dweetClient = require('node-dweetio')
const express = require('express')
const moment = require('moment')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const dweetio = new dweetClient()
const dweetThing = 'web-client-iot-case'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html')
})

app.use((req, res) => {
  res.status(404).json({
    mensagem: 'Resource not found'
  })
})

io.on('connection', (socket) => {
  console.log('A connection has benn established')
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

dweetio.listen_for(dweetThing, (dweet) => {
  const data = {
    sensorData: dweet.content,
    time: moment().format('HH:mm:ss')
  }
  io.emit('sensor-data', data)
})


http.listen(process.env.PORT || 3000, () => {
  console.log('Server on!')
})
