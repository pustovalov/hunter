/**
 * @format
 */

const axios = require('axios')
const notification = require('./lib/notification')

const sendTelegramCM = notification.sendTelegramCM
const sendTelegramLogsCM = notification.sendTelegramLogsCM

const checkRozetka = async() => {
  const currentTime = Date.now()
  const response = await axios.get('https://common-api.rozetka.com.ua/v2/goods/get-price/', {
    params: {
      id: 223596301
    }
  })

  const data = response.data

  if (
    (data.sell_status !== 'out_of_stock' && data.sell_status !== 'unavailable') ||
    data.has_shops ||
    data.show_in_site
  ) {

    sendTelegramCM(`Rozetka: TIME TO BUY PS5 \n currentTime: ${currentTime} \n link https://rozetka.com.ua/playstation_5_digital_edition_2/p223596301/`)
  }

  const logText = `
    --------------------------- \n
    log \n
    vendor: Rozetka \n
    currentTime: ${currentTime} \n
    data: ${JSON.stringify(data, '', 2)}
  `

  sendTelegramLogsCM(logText)
}

const checkALLO = async() => {
  const currentTime = Date.now()
  const response = await axios.post('https://allo.ua/ua/tsg_catalog/catalog/checkProductsInstock?products=2982445')

  const data = response.data['2982445']

  if (data.is_salable || data.pre_order) {
    sendTelegramCM(`ALLO: TIME TO BUY PS5 \n currentTime: ${currentTime} \n link: https://allo.ua/ua/igrovye-pristavki/konsol-playstation-5-digital-edition.html`)
  }

  const logText = `
    --------------------------- \n
    log \n
    vendor: ALLO \n
    currentTime: ${currentTime} \n
    data: ${JSON.stringify(data, '', 2)}
  `

  sendTelegramLogsCM(logText)
}

const program = async() => {
  await checkRozetka()
  await checkALLO()
}

module.exports.run = async(event, context, callback) => {
  await program()
}
