const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDatabase = require('./configs/database')
const authRoutes = require('./router/authRoutes')
const openAiRoutes = require('./router/openAiRoutes')
const errorHandler = require('./middlewares/errorMiddleware')
const path = require('path')
// connecting database
connectDatabase()


//intilizing app
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(errorHandler)

//deployment code 

app.use(express.static(path.join(__dirname, './client/build')))

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
})


// REST API Routes
app.use('/api/v1/auth/', authRoutes)
app.use('/api/v1/openai', openAiRoutes)



// starting server on port 8080
app.listen(process.env.PORT, () => console.log('server started successfully'))