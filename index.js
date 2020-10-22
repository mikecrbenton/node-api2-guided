const express = require("express")
const users = require("./users/users-model")

// IMPORTS
const usersRouter = require("./users/users-router")
const welcomeRouter = require("./welcome/welcome-router")

const server = express()
const port = 4000

server.use(express.json())
server.use(usersRouter) //import
server.use(welcomeRouter)


server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
