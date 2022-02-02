/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { useSocket } from "../context/useSocket"

function Main({ user }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const socket = useSocket()

  useEffect(() => {
    socket.on("private message", (message) => {
      setMessages([...messages, message])
    })
    return () => {
      socket.off("private message")
    }
  })

  return (
    <div
      css={css`
        flex-basis: 60%;
        height: 100vh;
        background-color: #e4d6d6;
      `}
    >
      <h1>聊天</h1>
      {user ? (
        <div className="message">
          <div>
            {messages &&
              messages.map((message, index) => {
                return (
                  <div
                    css={css`
                      text-align: ${message.form ? "left" : "right"};
                    `}
                    key={index}
                  >
                    {message.content}
                  </div>
                )
              })}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!input || !user) return
              socket.emit("private message", {
                content: input,
                to: user.userID,
              })
              setMessages([
                ...messages,
                {
                  content: input,
                  to: user.userID,
                },
              ])
              setInput("")
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
              }}
            />
            <input type="submit" value="send" />
          </form>
        </div>
      ) : (
        <div>请选择聊天对象</div>
      )}
    </div>
  )
}

export default Main
