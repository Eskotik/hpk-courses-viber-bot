const { transferOrdersDataToGoogleSheet } = require('../utils/transferOrdersDataToGoogleSheet')

describe('Transfer Orders Data to Google Sheet', () => {
  it('should transfer data to Google Sheet without errors', async () => {
    try {
      await transferOrdersDataToGoogleSheet()
    } catch (error) {
      fail(error)
    }
  })
})
