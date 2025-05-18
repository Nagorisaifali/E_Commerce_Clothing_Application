

const jwt = require("jsonwebtoken") ; 
const bcrypt = require("bcrypt") ; 
const blacklistmodel = require("../models/blacklist.js") ;
const userModel = require("../models/user.js") ; 
const productModel = require("../models/product") ; 
const paymentModel = require('../models/payment.js') ; 
const orderModel = require('../models/order.js') ; 

const Razorpay = require('razorpay');

var instance = new Razorpay({  
  key_id: process.env.RAZORPAY_KEY_ID , 
  key_secret: process.env.RAZORPAY_KEY_SECRET , 
});

module.exports.signup = async (req , res , next) => {
    try {
        const {email , password , username , role} = req.body ; 
        if(!email , !password , !username){
            return res.status(400).json({
                message : "All fields are required" , 
            })
        }
        const existUser = await userModel.findOne({email}) ; 
        if(existUser) {
            return res.status(400).json({
                message : "User already exist" , 
            }) ; 
        }
        const hashedpassword = await bcrypt.hash(password , 10) ; 
        const user = await userModel.create({
            email , username , role , 
            password : hashedpassword , 
        })

        const token = jwt.sign({_id : user._id} , process.env.JWT_SECRET , {expiresIn : '1h'}) ; 

        res.status(201).json({
            message : "User created successfully" , 
            user , 
            token 
        }) ; 

    }catch(err){
        next(err) ; 
    }
}

module.exports.signin = async (req , res , next) =>{
    try {
        const {email , password} = req.body ; 

        if(!email || !password){
            return res.status(400).json({
                message : "All field are required"  
            });
        }
        const user = await userModel.findOne({email}) ; 
        if(!user){
            return res.status(400).json({
                message : "invalid email or password"  , 
            })
        } 

        const isPasswordCorrect = await bcrypt.compare(password , user.password) ;    
        if(!isPasswordCorrect){
            return res.status(400).json({
                message : "invalid email or password" , 
            })
        }
        const token = jwt.sign({_id : user._id} , process.env.JWT_SECRET , {expiresIn : "1h"}) ; 
        res.status(201).json({
            message : "User signed in successfully" , 
            user , 
            token 
        }) ; 
    }
    catch(err){
        next(err) ; 
    }
}


module.exports.logout = async (req , res , next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]  ; 
        if(!token) 
            return res.status(400).json({
            message : "Token is required"  ,  
        })
        const isTokenBlackList = await blacklistmodel.findOne({token}) ; 

        if(isTokenBlackList){
            return res.status(400).json({
                message : "Token is already blackListed" , 
            }) ; 
        }
        await blacklistmodel.create({token}) ; 
    }
    catch(err){
        next(err) ; 
    }
}

module.exports.getProfile = async (req , res , next) => {
    try{
        const user = await userModel.findById(req.user._id) ; 

        res.status(200).json({
            message : "User fetched successfully" ,
            user  
        })
    }catch(err){
        next(err) ; 
    }
}

module.exports.getProducts = async (req , res , next) => {
    try{
        const products = await productModel.find({}) ; 

        res.status(200).json({
            products
        })
    }
    catch(err){
        next(err) ; 
    }
}


module.exports.getProductById = async (req , res , next) => {
    try{
        const product = await productModel.findById(req.params.id) ; 

        res.status(200).json({
            product 
        })
    }
    catch(err){
        next(err) ; 
    }
}

module.exports.userProfile = async (req , res , next) => {
    try{
        const user = await userModel.findById(req.user.id).select('-password') ; 
        res.json(user) ;  
    }
    catch(err){
        next(err) ; 
    }
}

module.exports.createOrder = async (req , res , next) => {
    try{
        const product = await productModel.findById(req.params.id) ; 
        const option = {
            amount : product.price * 100 , 
            currency : "INR" , 
            receipt : product._id   , 
        }

        const order = await instance.orders.create(option) ;

        res.status(200).json({
            order 
        });   

        const payment = await paymentModel.create({
            orderId : order.id ,   
            amount : product.price , 
            currency : "INR" ,  
            status : "pending" , 
        }) ; 

    }   
    catch(err){
        console.log(err) ; 
        next(err) ; 
    }
}

 
module.exports.verifyPayment = async (req , res , next) => {
    try{

        const { paymentId , orderId , signature } = req.body ; 
        const secret = process.env.RAZORPAY_KEY_SECRET ; 

        const { validatePaymentVerification } = require("../node_modules/razorpay/dist/utils/razorpay-utils.js") ;
    
        

        const isValid = validatePaymentVerification({
            order_id : orderId , 
            payment_id : paymentId ,  
        }, signature , secret) ; 

        if(isValid){

            const payment = await paymentModel.findOne({
                orderId : orderId 
            })
                                                    
            payment.paymentId = paymentId ; 
            payment.signature = signature ; 
            payment.status = "Success" ; 

            await payment.save() ; 

            res.status(200).json({
                message : "Payment verified successfully"  ,
            })

        }else {
            const payment = await paymentModel.findOne({
                orderId : orderId 
            })

            payment.status = "failed" ; 

            res.status(400).json({
                message : "Payment verification faiiled" ,
            })
        }
        
    }
    catch(err){
        next(err) ; 
    }
}




