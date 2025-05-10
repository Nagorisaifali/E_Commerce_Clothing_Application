

const mongoose = require('mongoose'); 

const Schema = mongoose.Schema ; 
const productSchema = new Schema({
    name : {
        type : String , 
        required : true , 
    } , 
    description : {
        type : String , 
        require : true , 
    }, 
    price : {
        type : Number , 
        required:true , 
    }, 
    images : [{
        Type : String , 
    }] ,
    seller : {
        type : Schema.Types.ObjectId  , 
        ref : "user"  , 
        required : true , 
    }, 

},{timestamps : true }) ; 

module.exports = mongoose.model("product" , productSchema) ;



