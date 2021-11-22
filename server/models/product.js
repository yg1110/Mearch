const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  Date: {type: Date, default: Date.now},
  Image: {type: String, required: true},
  Sale: {type: String, required: true},
  Title: {type: String, required: true, trim: true},
  Price: {type: Number, require: true},
  SalePrice: {type: Number, required: true},
  Colors: {type: [], required: true},
})

module.exports = mongoose.model('Products', ProductSchema)
