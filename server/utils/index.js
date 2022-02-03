class SessionStore {
  constructor() {
    this.sessions = new Map()
  }

  findSession(username) {
    return this.sessions.get(username)
  }

  saveSession(username, session) {
    this.sessions.set(username, session)
  }

  findAllSessions() {
    return [...this.sessions.values()]
  }
}

class MessageStore {
  constructor() {
    super()
    this.messages = []
  }

  saveMessage(message) {
    this.messages.push(message)
  }

  findMessagesForUser(userID) {
    return this.messages.filter(
      ({ from, to }) => from === userID || to === userID
    )
  }
}

const sessionStore = new SessionStore()
const messageStore = new MessageStore()
module.exports = {
  sessionStore,
  messageStore,
}
