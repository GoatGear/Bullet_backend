import 'dotenv/config'
import http from 'http'
import app from './app.js'
import { connectDB } from './db.js'
import mongoose from 'mongoose'

connectDB()

const server = http.createServer(app)
server.listen(process.env.PORT, () => {
    console.log('Iniciado en puerto:', process.env.PORT)
})

const shutdown = async (signal) => {
    console.log(`${signal} recibido — cerrando servidor...`)
    server.close(async () => {
        try {
            await mongoose.connection.close()
            console.log('Conexión MongoDB cerrada.')
        } catch (err) {
            console.error('Error cerrando MongoDB:', err)
        }
        process.exit(0)
    })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT',  () => shutdown('SIGINT'))
process.on('uncaughtException', (err) => {
    console.error('uncaughtException:', err)
    shutdown('uncaughtException')
})
process.on('unhandledRejection', (reason) => {
    console.error('unhandledRejection:', reason)
    shutdown('unhandledRejection')
})
