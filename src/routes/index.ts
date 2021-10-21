import express from 'express'
import sample from './sample'

const rootRoute = express.Router()

rootRoute.use('/sample', sample)

export default rootRoute
