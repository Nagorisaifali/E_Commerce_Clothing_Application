
const express = require('express') ; 
const productModel = require("../models/product") ; 
const upload = require("../config/multer.config") ; 
const authMiddleware = require("../middlewares/auth"); 
const productController = require("../controller/product.controller") ; 

const router = express.Router() ; 
router.use(authMiddleware.isAuthenticated).use(authMiddleware.isSeller)

router.post("/create" , upload.any() ,  productController.createProduct)

module.exports = router ; 

//  upload.array('images')