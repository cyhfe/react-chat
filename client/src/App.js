/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import Login from "./components/Login"
import Chat from "./components/Chat"

import { useState } from "react"

function App() {
  const [username, setUsername] = useState("")
  return (
    <div className="app">
      {username ? <Chat /> : <Login onSubmit={setUsername} />}
    </div>
  )
}

export default App
