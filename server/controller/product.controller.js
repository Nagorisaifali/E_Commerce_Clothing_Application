
const productModel = require("../models/product") ; 

exports.createProduct = async (req , res) =>{
    try{

        const {name , description , price} = req.body ; 

        const images = req.files.map(file => file.path).filter(url => url ? true : false  ) ;

        console.log(images)

        if(!name || !description || !price){
            return res.status(400).json({
                message : "All fields are required" 
            }) ; 
        }



        const product = await productModel.create({
            name , description , price , images : req.file , seller : req.user._id  
        })

        res.status(201).json({
            message : "Product created successfully" 
        })

    }
    catch(error){
        res.status(500).json(error) ;  
    }
}