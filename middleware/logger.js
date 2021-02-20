
//server.use(morgan('combined'))

// CUSTOM VERSION OF THE SAME THING

// HIGHER ORDER FUNCTION THAT RETURNS 
// A LOGGER MIDDLEWARE AS A FUNCTION TO CALL
module.exports = ( format ) => { 
   
   return (req, res, next) => {

      switch(format){
         case "short":
            console.log(`[ ${req.method} ${req.url} ]`)
            break;
         case "long":
            const time = new Date().toISOString()
            console.log(`[ ${time} ${req.ip} ${req.method} ${req.url} ]`)
            break;
      }
      // *** Callback function that is called by middleware to 
      // *** move to the next middleware function
      next()
   }

}

// next()  -->   next() -->    next -->   ...