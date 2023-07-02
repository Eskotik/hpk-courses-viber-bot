const ViberBot = require('viber-bot').Bot
require('dotenv').config()

const bot = new ViberBot({
  authToken: process.env.BOT_ACCOUNT_TOKEN,
  name: process.env.VIBER_BOT_NAME,
  avatar: process.env.VIBER_BOT_AVATAR,
})
module.exports = bot
