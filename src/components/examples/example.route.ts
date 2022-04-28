import express from 'express'
import { example } from './example.controller'

const router = express.Router()

router.get('/', example)

export { router }
