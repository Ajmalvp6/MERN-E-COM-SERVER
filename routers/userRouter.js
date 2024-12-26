const express = require('express')
const { register, login, newCollection, popularinWomen, addtoCart, getCartProducts, removeFromCart, relatedProducts } = require('../controllers/userController')
const { verifytoken } = require('../middlewares/jwtwebtoken')

const router = new express.Router()



// userRegister 

router.post('/register',register)


router.post('/login',login)

router.get('/newCollection',newCollection)

router.get('/popularinwomen',popularinWomen)


router.post('/addtocart',verifytoken,addtoCart)

router.post('/removefromcart',verifytoken,removeFromCart)

router.get('/getcartProducts',verifytoken,getCartProducts)

router.get('/relatedproducts/:productId',relatedProducts)


module.exports = router 
