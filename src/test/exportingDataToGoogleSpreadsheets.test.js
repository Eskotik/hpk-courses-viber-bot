const bot = require('../bot/bot')

const { Message } = require('viber-bot')
const TextMessage = require('viber-bot').Message.Text
const { transferOrdersDataToGoogleSheet } = require('../utils/transferOrdersDataToGoogleSheet')

test('Data export to Google Spreadsheets', async () => {
  const message = new TextMessage('[export]')
  const response = {
    send: jest.fn(),
  }

  const transferOrdersDataToGoogleSheetMock = jest.spyOn(transferOrdersDataToGoogleSheet)

  await bot.emit(Message.Text, message, response)

  expect(transferOrdersDataToGoogleSheetMock).toHaveBeenCalled()

  expect(response.send).toHaveBeenCalledWith(
    new TextMessage('Дані занесено в Google Spreadsheets', initialKeyboard)
  )
})
