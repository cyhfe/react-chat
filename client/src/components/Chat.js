/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import Main from "./Main"
import SideBar from "./SideBar"

function Chat() {
  return (
    <div
      className="app"
      css={css`
        display: flex;
      `}
    >
      <Main />
      <SideBar />
    </div>
  )
}

export default Chat
