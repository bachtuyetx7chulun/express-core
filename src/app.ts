import express from 'express'
// import { Server } from 'socket.io'
import { router as exampleRoute } from './components/examples/example.route'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', exampleRoute)

// const io = new Server(server)

export { app }
