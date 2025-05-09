
const mongoose = require('mongoose'); 

const Schema = mongoose.Schema ; 
const orderSchema = new Schema({
    products : {
       type : Schema.Types.ObjectId , 
       ref : "product" , 
    } , 
    buyer: {
        type : Schema.Types.ObjectId , 
        ref : "user" , 
        required : true , 
    }, 
    payment : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "payment"  , 
        required:true , 
    },
    

},{timestamps : true }) ; 

module.exports = mongoose.model("order" , orderSchema) ; 

