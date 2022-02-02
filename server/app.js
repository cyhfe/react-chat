const express = require("express")
const app = express()

app.listen(3000, () => {
  console.log("server running in 3000")
})

module.exports = app
