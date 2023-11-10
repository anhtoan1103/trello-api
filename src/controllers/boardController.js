import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // route data to service layer
    const createdBoard = await boardService.createNew(req.body)
    // return result to client
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'toto beo')
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id

    const board = await boardService.getDetails(boardId)

    // return result to client
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'toto beo')
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
  getDetails
}
