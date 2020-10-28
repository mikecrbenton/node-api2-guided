
module.exports = () => {

   return (res,req,next) => {
      // A header value from the request that tells us which client is being used
      console.log( req )
      const agent = req.req["user-agent"]

      if( /insomnia/.test(agent) ) {
         return res.status(418).json( {message: "Insomnia not allowed"} )
      }

      next()
   }

}