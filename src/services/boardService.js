/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdBoard = await boardModel.createNew(newBoard)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {

    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    // clone a board that not related to the old one
    const resBoard = cloneDeep(board)

    // add card to the right column
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id)) // equal method is belonged to mongoDB
    })

    // remove cards field
    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails
}