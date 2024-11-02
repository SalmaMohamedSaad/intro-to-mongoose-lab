const mongoose = require('mongoose')
const customersSchema = new mongoose.Schema({
  name: String,
  age: Number
})
// models/Customers.js
const Customers = mongoose.model('Customers', customersSchema)
module.exports = Customers
