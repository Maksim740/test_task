import * as uuid from 'uuid'
import * as fs from 'fs'
import * as path from 'path'

class FileService {

    async saveFile(file){
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve('static', fileName)
            await file.mv(filePath)
            return fileName
    }    

     deleteFile(fileName){
        fs.unlinkSync('static\\'+fileName)
    }
  
}

export default new FileService()


