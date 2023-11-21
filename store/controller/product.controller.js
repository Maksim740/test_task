import productService from'../productservice/product_service.js'
import fileService from '../fileservice/fileservice.js'
import * as ErrorException from '../errorexception/errorexception.js'

class ProductController {   
async createProduct(req, res){
    try{
        const product = await productService.createProduct(req.body)
        res.json(product.rows[0]) // СТАТУТС мож добав?
    } catch (e){
        console.log(e)  
        res.status(500).json(e.message)
    }
} 

async getProducts(req, res){
    try {
    const products = await productService.getProducts(req.query.page, req.query.limit)
    console.log(products)
    return res.json({ data: products.rows , pagination: {
        total: products.rowCount, 
        page: req.query.page }
    })
    } catch (e){
        console.log(e)  
        res.status(500).json(e.message)
    }
}


async getOneProduct(req, res){
    try{
        const product = await productService.getOneProduct(req.params.id) 
        return res.json(product.rows[0])
    } catch (e){
        console.log(e)  
        if ( typeof(e) === ErrorException )
            res.status(e.code).json(e.message) 
        else
            res.status(500).json(e.message)
    }
}

async updateProduct(req, res){ 
    try{ 
        const product = await productService.updateProduct(req.body)
        return res.json(product.rows[0])
    } catch (e){
        console.log(e)  
        if ( typeof(e) === ErrorException )
            res.status(e.code).json(e.message) 
        else
            res.status(500).json(e.message)
    }
}

async deleteProduct(req, res){
    try{
        const product = await productService.deleteProduct(req.params.id)
        return res.json("Product deleted")
    } catch (e){
        console.log(e)  
        if ( typeof(e) === ErrorException )
            res.status(e.code).json(e.message) 
        else
            res.status(500).json(e.message)
    }
}

async savePicture(req, res){
    try{
        let namePicture = await fileService.saveFile(req.files.picture)
        res.json(namePicture)
    } catch (e){
        console.log(e)
        return res.status(500).json(e.message)
    }
}

}

export default new ProductController()