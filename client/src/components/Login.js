import { useState } from "react"

function Login({ onSubmit }) {
  const [input, setInput] = useState("")
  const handleClickEnter = () => {
    if (!input) return
    onSubmit(input)
  }
  return (
    <div>
      <label htmlFor="username">username</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleClickEnter}>enter</button>
    </div>
  )
}

export default Login
