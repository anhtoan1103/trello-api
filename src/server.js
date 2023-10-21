/* eslint-disable no-console */


import express from 'express'
import cors from 'cors'
import AsyncExitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from './config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
  const app = express()
  app.use(cors(corsOptions))
  app.use(express.json())

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.use('/v1', APIs_V1)

  // Middleware for Centralized Handling of Errors
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.toto}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }`)
  })

  AsyncExitHook(() => {
    console.log('Disconnecting')
    CLOSE_DB()
    console.log('Disconnected')
  })
}

//IIFE js: run function after define
(async () => {
  try {
    console.log('connecting')
    await CONNECT_DB()
    console.log('connected')
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()

//CONNECT_DB().then(() => console.log('connect to db')).then(() => START_SERVER()).catch((err) => console.log(err))


