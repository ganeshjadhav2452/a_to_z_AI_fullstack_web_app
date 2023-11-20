const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDatabase = require('./configs/database')
const authRoutes = require('./router/authRoutes')
const errorHandler = require('./middlewares/errorMiddleware')
// connecting database
connectDatabase()


//intilizing app
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(errorHandler)
// REST API Routes
app.use('/api/v1/auth/', authRoutes)
// starting server on port 8080
app.listen(process.env.PORT, () => console.log('server started successfully'))