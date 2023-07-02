const { Message } = require('viber-bot')
const TextMessage = require('viber-bot').Message.Text
const bot = require('../bot/bot')

test('Sending course phone numbers', async () => {
  const message = new TextMessage('Courses')
  const response = {
    send: jest.fn(),
  }

  await bot.emit(Message.Text, message, response)

  expect(response.send).toHaveBeenCalledWith(
    new TextMessage('(097) 800 72 20 - Валерій\n(0382) 63 05 05 - Відділ кадрів', initialKeyboard)
  )
})
