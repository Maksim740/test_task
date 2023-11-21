const Router = require('express')
const router = new Router()
const productController = require('../controller/product.controller')

router.post('/product', productController.createProduct)
router.get('/products', productController.getProducts) 
router.get('/product/:id', productController.getOneProduct)
router.put('/product', productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)
router.post('/picture', productController.savePicture) 
//router.delete('/picture', productController.deletePicture) 
module.exports = router

