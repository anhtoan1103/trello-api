import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/').get((req, res) => {
  res.status(StatusCodes.OK).json({ message: 'api ready to board get' })

}).post((req, res) => {
  res.status(StatusCodes.CREATED).json({ message: 'api ready to board post' })

})

export const boardRoutes = Router