/**
 * @format
 */

const axios = require('axios')
const notification = require('./lib/notification')

const sendTelegramCM = notification.sendTelegramCM
const sendTelegramLogsCM = notification.sendTelegramLogsCM

const checkRozetka = async() => {
  const response = await axios.get('https://common-api.rozetka.com.ua/v2/goods/get-price/', {
    params: {
      id: 223588825
    }
  })

  const data = response.data

  if (data.sell_status !== 'out_of_stock' || data.has_shops || data.show_in_site) {
    sendTelegramCM('Rozetka: TIME TO BUY PS5')
  } else {
    const logText = `
      --------------------------- \n
      log: nothing \n
      vendor: Rozetka \n
      data: ${JSON.stringify(data, '', 2)}
    `

    sendTelegramLogsCM(logText)
  }
}

const checkALLO = async() => {
  const response = await axios.post('https://allo.ua/ua/tsg_catalog/catalog/checkProductsInstock?products=2982393')

  const data = response.data['2982393']

  if (data.is_salable || data.pre_order) {
    sendTelegramCM('ALLO: TIME TO BUY PS5')
  } else {
    const logText = `
      --------------------------- \n
      log: nothing \n
      vendor: ALLO \n
      data: ${JSON.stringify(data, '', 2)}
    `

    sendTelegramLogsCM(logText)
  }
}

const checkMOYO = async() => {
  const response = await axios.get('https://www.moyo.ua/igrovaya_pristavka_playstation_5_pervaya_postavka_/475055.html')
  const data = response.data

  if (!data.includes('Товар закончился')) {
    sendTelegramCM('MOYO: TIME TO BUY PS5')
  } else {
    const logText = `
      --------------------------- \n
      log: nothing \n
      vendor: MOYO
    `

    sendTelegramLogsCM(logText)
  }
}

const program = async() => {
  await checkRozetka()
  await checkALLO()
  await checkMOYO()
}

module.exports.run = async(event, context, callback) => {
  await program()
}
