const productService = require('../productservice/product_service')
const fileService = require('../fileservice/fileservice')
class ProductController {   
async createProduct(req, res){
    try{
        const product = await productService.createProduct(req.body)
        res.json(product.rows[0])
    } catch(e){
        e.message="The product was not created"
        console.log(e)    
        res.status(500).json(e.message)
    } 
} 

async getProducts(req, res){
    try {
    const products = await productService.getProducts(req.query.page, req.query.limit)
    return res.json({ rowCount: products.rowCount, page: products.rows })
    } catch(e){ 
        e.message="Failed to get a list of products"
        console.log(e)    
        res.status(500).json(e.message) 
    }
}


async getOneProduct(req, res){
    try{
     const product=await productService.getOneProduct(req.params.id) 
     return res.json(product.rows[0])
    } catch (e){
        e.message="Failed to get the product"
        console.log(e)    
        res.status(500).json(e.message)
    }
}

async updateProduct(req, res){ 
    try{
        const product=await productService.updateProduct(req.body)
        return res.json(product.rows[0])
    } catch (e){
        if (e.message==='id не указан'){
            console.log(e)  
            return res.status(400).json(e.message)}
         else{
            e.message="Failed to update data"
            console.log(e)  
            return res.status(500).json(e.message)}
    }
}

async deleteProduct(req, res){
    try{
     const product = await productService.deleteProduct(req.params.id)
    if(product.rowCount == 1)
        return res.json("The product has been removed")
    else
        return res.status(400).json("Invalid id")
    } catch (e){
        e.message="Could not delete the product"
        console.log(e)  
        return res.status(500).json(e.message)}
}

async savePicture(req, res){
    try{
        let namePicture = await fileService.saveFile(req.files.picture)
        res.json(namePicture)
    } catch (e){
        e.message="The picture is not saved"
        console.log(e)
        return res.status(500).json(e.message)
    }
}
async deletePicture(req, res){
    try{
        await fileService.deleteFile(req.body.picture)
        res.json('The picture was deleted successfully')
    } catch (e){
        e.message="The picture has not been deleted from the server"
        console.log(e)
        res.status(500).json(e.message)
    }
}
    
}

module.exports = new ProductController()