import fileService from '../fileservice/fileservice.js'
import db from '../db/db.js'
import ErrorException from '../errorexception/errorexception.js' // Что конкретно здесь ErrorException?

class ProductService {
    async createProduct(product){
        const{name, price, quantity, picture} = product
        const newProduct = await db.query('INSERT INTO products (name, price, quantity, picture) values ($1, $2, $3, $4) RETURNING *', [name, price, quantity, picture]) 
        return newProduct
    } 
    
    async getProducts(page, limit){ 
        const offset = (page-1)*limit
        const Products = await db.query('select * from products limit $1 offset $2', [limit, offset])
        const Rows =  await db.query('select * from products')
        return {rows: Products.rows, rowCount: Rows.rowCount}
    }
    
    async getOneProduct(id){ 
            const product = await db.query('select * from products where id = $1', [id])
            if(product.rowCount === 0)
                throw new ErrorException('Product by id not found', 404)
            return product
    }
    
    async updateProduct(product){ 
        if(!product.id)
            throw new ErrorException ('ID not specified', 400)
        const oldProduct = await this.getOneProduct(product.id)
        if( oldProduct.rows[0].picture !== '' ){// возможно стоит добавить && !== null иначе метод вызыв при null в поле. Но если оставлять, то все таки  ''
            fileService.deleteFile(oldProduct.rows[0].picture)}
        const updateProduct = await db.query('UPDATE products set name = $1, price = $2, quantity = $3, picture = $4 where id = $5 RETURNING *', [product.name, product.price, product.quantity, product.picture, product.id]) 
        return updateProduct
    }
    
    async deleteProduct(id){
        const product = await this.getOneProduct(id)
        if( product.rows[0].picture !== '' )
            fileService.deleteFile(product.rows[0].picture)  
        const deletedProduct = await db.query('DELETE FROM products where id = $1 RETURNING *', [id])
        return deletedProduct
    }

}

export default new ProductService()

