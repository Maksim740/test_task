const uuid = require('uuid')
let fs = require('fs');
const path = require('path')

class FileService {

    async saveFile(file){
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve('static', fileName)
            await file.mv(filePath)
            return fileName
    }    

    async deleteFile(fileName){ //Здесь все так сложно потому, что unlinkп из можуля fs не промисифицировна и ей нужен колбек. 
    //А с колбеком я не могу нормально ошибку обработать (сгенерировать новую и поймать catch) потому, как только это делаю сразу сервер падает. 
    // Я хз почему. Ну вот тут я ее промисифицировал чтобы использовать await 
        let unlinkPromise= function(file){
            return new Promise((resolve, reject) => {
                fs.unlink('static\\'+ file, (err) => {
                    if(err) reject(err)
                    else resolve('done')
                })                
            })
        }
        await unlinkPromise(fileName)
        //await db.query('UPDATE products set picture = $1 where picture = $2 RETURNING *', [null, fileName]) все таки луче в сервис дял продукта перенести
        //+ вдруг будут расширять прилож и кому нить понадлбится это сервис а там обращение к конкрет табл. Тоже самое и для сохр пикчи
    }
  
}

module.exports = new FileService()


