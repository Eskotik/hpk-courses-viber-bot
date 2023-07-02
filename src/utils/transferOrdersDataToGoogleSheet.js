const { GoogleSpreadsheet } = require('google-spreadsheet')
const { connectToDatabase } = require('../database/database')
const Orders = require('../models/Orders')
require('dotenv').config()

const transferOrdersDataToGoogleSheet = async () => {
  try {
    await connectToDatabase()
    const creds = require('../../hpfk-389609-2ad2fc504047.json')

    const doc = new GoogleSpreadsheet(process.env.Sheet_ID)

    await doc.useServiceAccountAuth(creds)

    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[0]

    const ordersData = await Orders.find()

    await sheet.setHeaderRow([
      'ПІБ',
      'Мобільний студента',
      'Мобільний батьків',
      'Період',
      'Дата створення',
    ])

    for (const order of ordersData) {
      const dataRow = [
        order.Fullname,
        order.studentMobile,
        order.parentMobile,
        order.period,
        order.data_created,
      ]

      await sheet.addRow(dataRow)
    }
    console.log('Data transferred to Google Sheet successfully')
  } catch (error) {
    console.error('Error transferring data to Google Sheet:', error)
  }
}

module.exports = { transferOrdersDataToGoogleSheet }
