const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.DBURL)

        console.log('Database connected successfully...')
    } catch (error) {
        console.log('database error', error)
    }
}


module.exports = connectDatabase;