/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"

import Main from "./Main"
import SideBar from "./SideBar"

function Chat({ users }) {
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState(null)
  const message = messages?.[selectedUser]

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <div
      className="chat"
      css={css`
        display: flex;
      `}
    >
      <SideBar users={users} onSelectedUser={setSelectedUser} />
      <Main message={message} user={selectedUser} />
    </div>
  )
}

export default Chat
