// FILE FOR STANDALONE ROUTER WITH EXPRESS
const express = require("express")
// FUNCTIONS
const users = require("./users-model")
// CREATE A ROUTER W/EXPRESS
const router = express.Router()
// IMPORT CUSTOM MIDDLEWARE { DESTRUCTURED FUNCTION }
const { checkUserID, checkUserData } = require('../middleware/user')


router.get("/users", (req, res, next) => {
   // WORKING WITH QUERY STRINGS
   console.log(req.query)

	users.find(req.query) // QUERY STRING PARAMETER EXAMPLE(sortBy, limit etc..)
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((error) => { 
         // PASSES TO ERROR MIDDLEWARE ****WHEN next() HAS A PARAMETER****
         // SKIPS DOWN STACK TO ERROR MIDDLE WARE
         // ALLOWS US TO CALL NEXT() WITH D.R.Y CODE
         // ***ONLY TO BE USED WITH SERVER ERRORS - 500 TYPE, .catch()***
         next(error)
			// console.log(error)
			// res.status(500).json({
			// 	message: "Error retrieving the users",
			// })
		})
})
// CUSTOM MIDDLEWARE "SUB-STACKS" ( GLOBAL > SUB-STACKS )

// Why don't we need to pass (req,res) to middleware?
// Express makes req & res available as global state
// as they're passed down the middleware/routing stack

// Why can't middleware be called inside the function ?
// Because it's asynchronous, and would jump the gun
// if it wasn't in the middle-ware stack

router.get("/users/:id",checkUserID(),  (req, res) => {
   // ALL THIS CODE IS NOW IN USER.JS MIDDLEWARE
   // ==========================================
	// users.findById(req.params.id)
	// 	.then((user) => {
	// 		if (user) {
            // ACCESSING THE REQUEST BEING PASSED THROUGH THE STACK
            // IN 'REQUEST'
				res.status(200).json(req.fooBar) //NAMED IN MIDDLEWARE req.user
		// 	} else {
		// 		res.status(404).json({
		// 			message: "User not found",
		// 		})
		// 	}
		// })
		// .catch((error) => {
		// 	console.log(error)
		// 	res.status(500).json({
		// 		message: "Error retrieving the user",
		// 	})
		// })
})

router.post("/users", checkUserData(), (req, res, next) => {
   // IN USER.JS
	// if (!req.body.name || !req.body.email) {
	// 	return res.status(400).json({
	// 		message: "Missing user name or email",
	// 	})
	// }

	users.add(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			// console.log(error)
			// res.status(500).json({
			// 	message: "Error adding the user",
			// })
         next(error)
		})
})

router.put("/users/:id", checkUserData(), checkUserID(), (req, res, next) => {
   // IN USER.JS
	// if (!req.body.name || !req.body.email) {
	// 	return res.status(400).json({
	// 		message: "Missing user name or email",
	// 	})
	// }

	users.update(req.params.id, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			// console.log(error)
			// res.status(500).json({
			// 	message: "Error updating the user",
			// })
         next(error)
		})
})

router.delete("/users/:id", (req, res, next) => {
	users.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			// console.log(error)
			// res.status(500).json({
			// 	message: "Error removing the user",
			// })
         next(error)
		})
})

// create endpoint that returns all the posts for a user

router.get("/users/:id/posts", (req,res,next) => {
   users.findUserPosts(req.params.id)
      .then( (response) => {
         res.json(response)
      })
      .catch( (err) => { 
         // console.log(err) // for developer
         // res.status(500).json({ message:"Never send back unknown 500+ errors to the client - use general"}) 
         next(error)
      })
})
// create endpoint that returns a single post for a user

router.get("/users/:userId/posts/:postId", (req,res)=>{
   users.findUserPostById( req.params.userId, req.params.postId )
      .then( (response) => {
         if(response){
            res.json(response)
         }else{
            res.status(404).json( {message:"Post was not found"} )
         }
      })
      .catch( (err) => { 
         console.log(err) // for developer
         res.status(500).json({ message:"General message about user post "}) 
      })
})
// create endpoint for adding a new post for a user

router.post("/users/:id/posts", (req,res) => {

   if(!req.body.text) {
      // ** needs a 'return' to end/stop the function if not using an else{} **
      return res.status(400).json( {message:"Need a text value"})
   }
   users.addUserPost( req.params.id, req.body )
      .then( (post) => {
         res.status(201).json(post)
      })
      .catch( (err) => { 
         console.log(err) // for developer
         res.status(500).json({ message:"Could not create user post "}) 
      })

})

//module.exports is the way to export in node
module.exports = router