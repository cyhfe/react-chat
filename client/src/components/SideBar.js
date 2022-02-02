/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"

function SideBar({ users, onSelectedUser }) {
  return (
    <div
      css={css`
        flex-basis: 40%;
        height: 100vh;
        background-color: #b4a5a5;
      `}
    >
      <h1>在线</h1>
      {users &&
        users.map((user, index) => (
          <div key={index} onClick={() => onSelectedUser(user)}>
            {user.username}
          </div>
        ))}
    </div>
  )
}

export default SideBar
