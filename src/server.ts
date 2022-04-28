import dotenv from 'dotenv'
import 'reflect-metadata'
dotenv.config()

import { Server } from '@app'
const server = new Server()
server.start()
