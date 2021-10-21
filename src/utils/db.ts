import mongoose from 'mongoose'
import { DatabaseConnectionError } from '@haog1/micro-core'

export const startDb = async (path: string = '') => {
  try {
    if (!process.env.DB_STRING) {
      throw new DatabaseConnectionError()
    }
    await mongoose.connect(process.env.DB_STRING! + '/' + path, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('Connected to mongo db...')
  } catch (error) {
    console.error(error)
    throw error
  }
}
