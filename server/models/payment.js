

const mongoose = require('mongoose'); 

const Schema = mongoose.Schema ; 
const paymentSchema = new Schema({
    orderId : {
        type : String , 
        required : true , 
    } , 
    paymentId : {
        type : String , 
    }, 
    signature : {
        type : String , 
    },
    amount : {
        type : Number , 
        required : true , 
    }, 
    currency : {
        type : String , 
        required : true , 
    },
    status : {
        type : String , 
        enum : ["pending" , "Success"  ,"failed"] , 
        required : true , 
    }

},{timestamps : true }) ; 

module.exports = mongoose.model("payment" , paymentSchema) ; 

