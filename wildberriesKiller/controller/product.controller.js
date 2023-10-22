const productService = require('../productservice/product_service')
const fileService = require('../fileservice/fileservice')
class ProductController {   
async createProduct(req, res){
    try{
        const product = await productService.createProduct(req.body)
        res.json(product.rows[0])
    } catch(e){
        console.log(e)    
        res.status(500).json(e.message)
    } 
} 

async getProducts(req, res){
    try {
    const products = await productService.getProducts(req.query.page, req.query.limit)
    return res.json({ data: products.rows, pagination: {
        total: products.rowCount, // <—- кол-во записей в базе, ... поменяй чтоли хотя имена в дж объейкте
        page: req.query.page, // <—- номер текущей ответа
  } } )
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
            return res.status(400).json('id не указан')} //возможно 404
        else if(e.message==='Продукт по id не найден'){ // Спросить у Артема почему нельзя обрабатыв ошибки по месежд и как ловить конкретные здесь
            console.log(e.message)
            return res.status(404).json('Продукт по id не найден')
        }
         else{
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
/*async deletePicture(req, res){
    try{
        await fileService.deleteFile(req.body.picture)
        res.json('The picture was deleted successfully')
    } catch (e){
        e.message="The picture has not been deleted from the server"
        console.log(e)
        res.status(500).json(e.message)
    }
}
  */  
}


module.exports = new ProductController()