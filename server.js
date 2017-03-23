'use strict'

const express = require('express')
const http = require('http')
const app = express()
const port = process.env.PORT || 3000
const server = http.createServer(app)
const io = require('socket.io')(server)
const connections = []

function findConnection (id) {
  return connections.filter(function (c) { return c.id === id })[0]
}
// start ther server listening
server.listen(port, () => {
  console.log('Server listening on port: ', server.address().port)
})

// serve static files with express
app.use(express.static('./public'))

// listen for a socket io connection event
io.on('connection', (socket) => {
  // new connection, save the socket to them
  connections.push({id: socket.id})
  console.log(`## New connection (${socket.id}). Total: ${connections.length}.`)

  // listen for a disconnect event
  socket.once('disconnect', () => {
    // find the connection and remove  from the collection
    let connection = findConnection(socket.id)
    if (connection) {
      connections.splice(connections.indexOf(connection), 1)
      if (connection.user) {
        let userLeftMsg = connection.user.name + ' has left the chat.'
        socket.broadcast.emit('left', userLeftMsg)
        // socket.broadcast.emit('left', connection.user)
        socket.broadcast.emit('online', connections)
        console.log(`## ${connection.user.name}(${connection.id}) disconnected. Remaining: ${connections.length}.`)
      } else {
        console.log(`## Connection (${connection.id}) (${socket.id}) disconnected. Remaining: ${connections.length}.`)
      }
    }
    socket.disconnect()
  })

  // listen for a chat message from a socket and broadcast it
  socket.on('join', (user) => {
    // attach the new user to the connection object
    let connection = findConnection(socket.id)
    connection.user = user
    // emit welcome message to new user
    socket.emit('welcome', `Hi ${user.name}. Welcome to Relac.js!`)
    // broadcast their arrival to everyone else
    let broadcastMsg = user.name + ' has joined the chat.'
    socket.broadcast.emit('joined', broadcastMsg)
    io.sockets.emit('online', connections)

    console.log(`## ${connection.user.name} joined the chat on (${connection.id}).`)
  })

  // broadcast chat message to other users
  socket.on('chat', (msg) => {
    let connection = findConnection(socket.id)
    // broadcast to other users
    let msgWithUser = connection.user.name + ': ' + msg
    socket.broadcast.emit('chat', msgWithUser)
    // socket.broadcast.emit('chat', {message: msg, user: connection.user})
    // console.log(`## ${connection.user.name} said: ${msg}`)
    console.log(msgWithUser)
  })
})
