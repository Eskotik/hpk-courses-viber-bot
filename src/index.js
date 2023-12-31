﻿const { Bot } = require('viber-bot')
const User = require('./models/User')
const Orders = require('./models/Orders')
const { connectToDatabase } = require('./database/database')
const { appOption, initialKeyboard } = require('./utils/Keyboards')
const { transferOrdersDataToGoogleSheet } = require('./utils/transferOrdersDataToGoogleSheet')
const bot = require('./bot/bot')
const BotEvents = require('viber-bot').Events
const TextMessage = require('viber-bot').Message.Text
const express = require('express')
const app = express()
require('dotenv').config()

start = async () => {
  try {
    connectToDatabase()
    bot.on(BotEvents.SUBSCRIBED, async (response) => {
      await response.send(
        new TextMessage(
          `Привіт ${response.userProfile.name}. \nBас вітає Хмельницький політехнічний фаховий коледж Національного університету "Львівська політехніка".`
        )
      )
      await response.send(
        new TextMessage(
          `Тут ви можете записатись на підготовчі курси до вступу в коледж. Оберіть пункт меню:`,
          initialKeyboard
        )
      )

      const userId = response.userProfile.id
      const userName = response.userProfile.name
      try {
        await User.updateOne({ id: userId }, { name: userName }, { upsert: true })
        console.log(`User ${userName} (ID: ${userId}) subscribed.`)
      } catch (err) {
        console.error('Error saving user subscription to the database:', err)
      }
    })

    bot.onTextMessage(/^Courses$/, (message, response) => {
      response.send(
        new TextMessage(
          `(097) 800 72 20 - Валерій\n(0382) 63 05 05 - Відділ кадрів`,
          initialKeyboard
        )
      )
    })

    bot.onTextMessage(/\[export\]/, async (message, response) => {
      if (response.userProfile.id === process.env.ADMIN_ID) {
        try {
          await transferOrdersDataToGoogleSheet()
          response.send(new TextMessage(`Дані занесено в Google Spreadsheets`, initialKeyboard))
        } catch (err) {
          console.log(err)
        }
      } else response.send(new TextMessage(`Ви не являєтесь адміністратором`, initialKeyboard))
    })

    let userData = {}

    bot.onTextMessage(/appType/i, (message, response) => {
      response.send(new TextMessage(`Виберіть варіант подачі заявки у меню нижче`, appOption))
      const userId = response.userProfile.id
      if (!userData[userId]) {
        userData[userId] = {}
      }
      const currentUserData = userData[userId]
      bot.onTextMessage(/\/forms\/([^/]+)/, (message, response) => {
        response.send(new TextMessage(' ', initialKeyboard))
      })

      bot.onTextMessage(/^https?:\/\/([\w.-]+)/, (message, response) => {
        response.send(new TextMessage(' ', initialKeyboard))
      })

      bot.onTextMessage(/^Questions$/, (message, response) => {
        response.send(new TextMessage(`Введіть ПІБ:`))
      })

      bot.onTextMessage(/.*/, async (message, response) => {
        if (!currentUserData.pib) {
          currentUserData.pib = message.text
          response.send(new TextMessage('Введіть мобільний номер учня:'))
        } else if (!currentUserData.studentMobile) {
          currentUserData.studentMobile = message.text
          response.send(new TextMessage('Введіть мобільний номер батьків:'))
        } else if (!currentUserData.parentMobile) {
          currentUserData.parentMobile = message.text
          response.send(
            new TextMessage(
              'Введіть період навчання:(січень-лютий, березень-квітень, травень-червень...)'
            )
          )
        } else {
          currentUserData.period = message.text
          const Data = new Date(Date.now()).toLocaleString()
          currentUserData.Data = Data
          response.send(new TextMessage('Ваші дані записано', initialKeyboard))

          if (
            currentUserData.pib &&
            currentUserData.studentMobile &&
            currentUserData.parentMobile &&
            currentUserData.period
          ) {
            const newOrder = new Orders({
              Fullname: currentUserData.pib,
              studentMobile: currentUserData.studentMobile,
              parentMobile: currentUserData.parentMobile,
              period: currentUserData.period,
              data_created: Data,
            })

            try {
              const savedOrder = await newOrder.save()
              console.log('Data saved successfully:', savedOrder)
              bot.sendMessage(
                {
                  id: process.env.ADMIN_ID,
                },
                new TextMessage(
                  `Ось дані, введені у заявці на курси\nПІБ: ${currentUserData.pib}\nМобільний учня: ${currentUserData.studentMobile}\nМобільний батьків: ${currentUserData.parentMobile}\nПеріод навчання: ${currentUserData.period}\nДата: ${currentUserData.Data}`
                )
              )
              delete userData[userId]
            } catch (err) {
              console.error('Error saving data:', err)
            }
          }
        }
      })
    })

    const port = process.env.PORT || 3000
    app.use('/viber/webhook', bot.middleware())

    app.listen(port, () => {
      console.log(`Application running on port: ${port}`)
      bot.setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`).catch((error) => {
        console.log('Can not set webhook on the following server. Is it running?')
        console.error(error)
        process.exit(1)
      })
    })
  } catch (error) {
    console.log(error)
  }
}

start()