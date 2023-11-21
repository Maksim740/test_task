import express from 'express'
import productRouter  from './routes/user.routes.js'
import fileupload from 'express-fileupload'

const PORT = 8080
const HOST = 'localhost'

const app = express()

app.use(fileupload({})) 
app.use(express.json()) 
app.use('/api', productRouter) 

app.listen(PORT, HOST, () => console.log(`Server started on PORT ${PORT}`))




