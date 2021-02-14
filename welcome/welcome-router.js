const express = require('express')  // MAIN IMPORT ( LIKE REACT )
const router = express.Router()     // CREATE NEW BRANCH / ROUTER

router.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})

module.exports = router             // EXPORT 