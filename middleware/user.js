const usersModel = require('../users/users-model')


// these are re-usable functions that can now be called in
// any of the endpoints to check for the user id, or other
// checks

function checkUserID() {
   return (req,res,next) => {
      usersModel.findById(req.params.id)
         .then((user) => {
            if (user) {
               // ATTACH DATA TO THE REQUEST SO IT CAN BE ACCESSED
               // IN THE STACK OF MIDDLEWARE FUNCTIONS AS IT IS
               // PASSED ALONG
               req.user = user;
               next() //middleware continues if conditions met
            } else {
               res.status(404).json({
                  message: "User not found",
               })
            }
         })
         .catch((error) => {
            console.log(error)
            res.status(500).json({
               message: "Error retrieving the user",
            })
         })
   }
}

function checkUserData() {
   return (req,res,next) => {
      if (!req.body.name || !req.body.email) {
         return res.status(400).json({message: "Missing user name or email" })
      }
      next()
   }
}



module.exports = {
   checkUserID,
   checkUserData
}