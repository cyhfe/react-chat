import React from "react"
import ReactDOM from "react-dom"

import { SocketProvider } from "./context/useSocket"

import "normalize.css"
import "./style.css"

import App from "./App"

const root = document.getElementById("root")

ReactDOM.render(
  <SocketProvider>
    <App />
  </SocketProvider>,
  root
)
