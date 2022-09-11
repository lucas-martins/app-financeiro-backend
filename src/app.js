import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import routes from './routes.js'

class App {
    constructor() {
        this.server = express()
        dotenv.config()

        mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(cors())
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server