import { useState } from "react"

function Login({ onSubmit }) {
  const [input, setInput] = useState("")

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!input) return
          onSubmit(input)
        }}
      >
        <label htmlFor="username">username</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input type="submit" value="enter" />
      </form>
    </div>
  )
}

export default Login
