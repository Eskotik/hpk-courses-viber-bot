const mongoose = require('mongoose')
const User = mongoose.model('User', {
  id: String,
  name: String,
})
module.exports = User
