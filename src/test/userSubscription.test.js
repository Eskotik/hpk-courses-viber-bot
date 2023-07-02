const bot = require('../bot/bot')
const { Events } = require('viber-bot')
const TextMessage = require('viber-bot').Message.Text
const User = require('./models/User')

test('User subscription', async () => {
  const userProfile = {
    id: 'USER_ID',
    name: 'John Doe',
  }

  const response = {
    userProfile: userProfile,
    send: jest.fn(),
  }

  await bot.emit(Events.SUBSCRIBED, response)

  const user = await User.findOne({ id: userProfile.id })
  expect(user.name).toEqual(userProfile.name)

  expect(response.send).toHaveBeenCalledWith(
    new TextMessage(
      'Привіт John Doe. Bас вітає Хмельницький політехнічний фаховий коледж Національного університету "Львівська політехніка"! Тут ви можете записатись на підготовчі курси до вступу в коледж. Оберіть пункт меню:',
      initialKeyboard
    )
  )
})
