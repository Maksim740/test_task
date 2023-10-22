const contentDisposition = require('content-disposition')
const fileService = require('../fileservice/fileservice')
const db = require('../db/db')
    
class ProductService {
    async createProduct(product){
        const{name, price, quantity, picture} = product
        const newProduct = await db.query('INSERT INTO products (name, price, quantity, picture) values ($1, $2, $3, $4) RETURNING *', [name, price, quantity, picture]) 
        return newProduct
    } 
    
    async getProducts(page, limit){
        const offset = (page-1)*limit
        const pageProducts = await db.query('select * from products limit $1 offset $2', [limit, offset])
        console.log(pageProducts)
        return pageProducts
    }
    
    
    async getOneProduct(id){ // тут тож проверку на айди навер и на пй не найден
        if(!id)
            throw new Error ('id не указан')
        const product = await db.query('select * from products where id = $1', [id])
        if(product.rowCount===0)
            throw new Error ('Продукт по id не найден') 
        return product
    }
    
    async updateProduct(product){ // тут кажись надо удалять картинку перед обновлением
        const oldProduct = await this.getOneProduct(product.id)
        if( oldProduct.rows[0].picture !== null && product.picture !== null ){
            await fileService.deleteFile(oldProduct.rows[0].picture)
        }
        const updateProduct = await db.query('UPDATE products set name = $1, price = $2, quantity = $3, picture = $4 where id = $5 RETURNING *', [product.name, product.price, product.quantity, product.picture, product.id]) 
        return updateProduct
    }
    
    async deleteProduct(id){ 
        const product = await db.query('DELETE FROM products where id = $1', [id]) // то что сначала удаляю строку, а потом пикчу норм ?  
        if(product.rowCount===0)
            throw new Error ('Продукт по id не найден')
        if(!product.picture===null)
            await fileService.deleteFile(product.picture)
        return product
    }
}


module.exports = new ProductService()

