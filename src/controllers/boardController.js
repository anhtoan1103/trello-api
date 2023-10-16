import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    console.log(req.body)
    // route data to service layer
    // return result to client
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'toto beo')
    res.status(StatusCodes.CREATED).json({ message: 'post from controller' })
  } catch (error) {
    next(error)
  }
}
export const boardController = {
  createNew
}
