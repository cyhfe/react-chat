/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import Login from "./components/Login"
import Chat from "./components/Chat"

import { useEffect, useState } from "react"
import { useSocket } from "./context/useSocket"
import { useLocalStorageState } from "./hooks/useLocalStorageState"

function App() {
  const [username, setUsername] = useState("")
  const [users, setUsers] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  const [sessionID, setSessionID] = useLocalStorageState("sessionID", null)

  const socket = useSocket()

  useEffect(() => {
    if (sessionID) {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID }
      socket.connect()
    } else {
      if (!username) return
      socket.auth = { username }
      socket.connect()
    }

    return () => {
      socket.close()
    }
  }, [username])

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true)
    })

    socket.on("session", ({ sessionID, userID }) => {
      socket.auth = { sessionID }
      setSessionID(sessionID)
      socket.userID = userID
    })

    socket.on("users", (users) => {
      setUsers(users)
    })

    socket.on("user connected", (user) => {
      setUsers([...users, user])
    })

    socket.on("user disconnected", (id) => {
      if (!users) return
      const newUsers = users.filter((user) => user.userID !== id)
      setUsers(newUsers)
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
    })
    socket.on("connect_error", (err) => {
      alert(err.message)
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("connect_error")
      socket.off("user connected")
      socket.off("user disconnected")
    }
  })

  return (
    <div className="app">
      {isConnected ? <Chat users={users} /> : <Login onSubmit={setUsername} />}
    </div>
  )
}

export default App
