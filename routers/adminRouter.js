const express = require('express')
const { register, addproduct, removeProduct, allProducts } = require('../controllers/productController')
const upload = require('../middlewares/multermiddleware')
const { uploadFile } = require('../controllers/uploadController')

const  router=express.Router()


// image upload 

router.post('/upload',upload.single('product'),uploadFile)


// add product 

router.post('/addproduct',addproduct)


// remove product 

router.post('/removeproduct',removeProduct)


// get all products

router.get('/allproducts',allProducts)



module.exports = router