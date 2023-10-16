import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log(req.body)

    // route data to service layer
    // return result to client
    res.status(StatusCodes.CREATED).json({ message: 'post from controller' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error.message })
  }
}
export const boardController = {
  createNew
}