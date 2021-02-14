const express = require("express")
//const users = require("./users/users-model") // NOW IN ROUTER
const morgan = require("morgan")
const deny = require("./middleware/deny")

// IMPORTS
const usersRouter = require("./users/users-router")
const welcomeRouter = require("./welcome/welcome-router")
const logger = require("./middleware/logger")

const server = express()
const port = 4000

// MIDDLEWARE
server.use(express.json())
server.use( deny() )
server.use( logger("long") ) // static variable being passed

// ATTACH SUB-ROUTERS TO MAIN APPLICATION - ORDER IS IMPORTANT LIKE CSS IN CASE OF 
// DUPLICATE ROUTES
server.use(usersRouter) 
server.use(welcomeRouter)

// ERROR MIDDLEWARE ( 4 params )
//==============================
// SITS AT THE BOTTOM OF THE STACK AND
// CATCHES ERRORS THAT FALL TO IT
server.use( (err, req, res, next) => {
   console.log(err)
   res.status(500).json( { message: "Error in processing"})
})


server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
