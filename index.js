require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')
const path = require('path')

const PORT = process.env.PORT
const baseURL = process.env.GLOBAL_CLIENT_URL;
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: baseURL
}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', router);
app.use(errorMiddleware)

const options = {
    dbName: 'foreste'
}

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, options)
        app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });
    }
    catch (e) {
        console.log(e)
    }
}
start()