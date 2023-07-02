const mongoose = require('mongoose')

const OrdersSchema = new mongoose.Schema(
  {
    Fullname: String,
    studentMobile: String,
    parentMobile: String,
    period: String,
    data_created: String,
  },
  { versionKey: false }
)

const Orders = mongoose.model('Orders', OrdersSchema)

module.exports = Orders
