const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  category: {
    type: String,
    required: true
  },
  category_cn: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Category', categorySchema)