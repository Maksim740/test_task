const express = require('express')
const productRouter = require('./routes/user.routes')
const fileupload = require('express-fileupload') 

const PORT = process.env.PORT || 8080
const app = express()

app.use(fileupload({})) 
app.use(express.json()) 
app.use('/api', productRouter) 

const HOST = 'localhost' 

app.listen(PORT, HOST, () => console.log(`Server started on PORT ${PORT}`))


