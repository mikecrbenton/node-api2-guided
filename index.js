const express = require("express")
//const users = require("./users/users-model") // NOW IN ROUTER
//const morgan = require("morgan") // 3rd PARTY MIDDLEWARE
const deny = require("./middleware/deny")

// IMPORTS
const usersRouter = require("./users/users-router")
const welcomeRouter = require("./welcome/welcome-router")
const logger = require("./middleware/logger")

const server = express()
const port = 4000

// GLOBAL MIDDLEWARE STACK / ORDER MATTERS
//server.use(morgan("combined")) // logs out http request
server.use(express.json()) // order matters! <-- example (req.body)
server.use( deny() )
server.use( logger("long") ) // static variable being passed

// ATTACH SUB-ROUTERS TO MAIN APPLICATION - ORDER IS IMPORTANT LIKE CSS IN CASE OF 
// DUPLICATE ROUTES
server.use(welcomeRouter)
server.use(usersRouter) 

// ERROR MIDDLEWARE ( 4 params )
//==============================
// SITS AT THE BOTTOM OF THE STACK AND
// CATCHES ERRORS THAT FALL TO IT
// 4 parameters defines that it will be error middleware
server.use( (err, req, res, next) => {
   console.log(err)
   res.status(500).json( { message: "Error in processing"})
})


server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

// 4 TYPES MIDDLEWARE IN EXPRESS
// 1) BUILT-IN ( express.json(), .Router(), etc...)
// 2) 3rd PARTY ( npm i , )
// 3) CUSTOM
// 4) ERROR (catches errors in other middleware)