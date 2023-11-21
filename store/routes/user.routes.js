import Router from 'express'
const router = new Router()
import productController from '../controller/product.controller.js'

router.post('/product', productController.createProduct)
router.get('/products', productController.getProducts) 
router.get('/product/:id', productController.getOneProduct)
router.put('/product', productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)
router.post('/picture', productController.savePicture) 

export default router 

