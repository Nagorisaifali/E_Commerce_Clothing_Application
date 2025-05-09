
const mongoose = require("mongoose") ; 

const connectDB =  () =>{
    try{
         mongoose.connect(process.env.MONGO_URI).then(() => {  
            console.log("connect mongoDB") ; 
        })
    }
    catch(err){
        console.log(err) ; 
    }
}

module.exports = connectDB ;