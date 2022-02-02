const http = require("http")
const app = require("./app")
const { Server } = require("socket.io")

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

io.use((socket, next) => {
  const username = socket.handshake.auth.username
  if (!username) {
    return next(new Error("invalid username"))
  }
  socket.username = username
  next()
})

io.on("connection", (socket) => {
  const users = []
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    })
  }
  socket.emit("users", users)

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  })

  // notify users upon disconnection
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id)
  })

  socket.on("private message", ({ content, to }) => {
    console.log({ content, to })
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    })
  })

  console.log("connect")
  console.log(socket.username, socket.id)
})

httpServer.listen(4000, () => {
  console.log("server running in 4000")
})
