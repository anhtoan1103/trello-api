import mongoose from 'mongoose'
const BoardSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true
  },
  title: String
})

module.exports = BoardSchema