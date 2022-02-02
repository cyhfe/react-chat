import { Children, createContext, useContext, useEffect } from "react"
import socket from "../utils/socket"

const SocketContext = createContext()

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export function useSocket() {
  const socket = useContext(SocketContext)
  return socket
}
