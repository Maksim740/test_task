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


/*1 крч разберись с реализацией через 4 столбца сначала и если вопросы артему
2 Про ошибки
3 если доведешь преализацию через 4 стобца можешь попробовать сдел 2 таб (там много проблем будет и sql надо вспомнить)
 и залить отдельной веткой или репозиторием на гит */