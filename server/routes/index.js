const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const schedule = require('node-schedule')

const router = express.Router()

const info = {
  title: [],
  sale: [],
  cash: [],
  img: [],
}

const getDocument = async () => {
  try {
    return await axios.get(
      'https://store.musinsa.com/app/clearance/lists?clearance_year=&clearance_month=&clearance_week=&d_cat_cd=&brand=&sale_fr_rate=&sale_to_rate=&sort=pop_category&sub_sort=&page=1&list_kind=small&ex_soldout=&exclusive_yn=&price=&price1=&price2=',
    )
  } catch (error) {
    console.error(error)
  }
}

const crawling = () => {
  return getDocument().then(document => {
    const $ = cheerio.load(document.data)

    const $li_box = $('.li_box').toArray()
    $li_box.forEach(element => {
      const el = cheerio.load(element)
      const title = el('.list_info').text().trim()
      const src = el('.lazy').attr('data-original')
      const img = `https:${src}`
      const price = el('.price').find('del').text()
      const salePrice = el('.price').text().split(price)[1].trim()
      const sale = el('.icon_new').text()
      info.img.push(img)
      info.sale.push(sale)
      info.title.push(title)
      info.cash.push({price: price, salePrice: salePrice})
    })

    return info
  })
}

schedule.scheduleJob('0 11 * * * *', () => {
  crawling().then(info => {
    console.log(info)
  })
})

router.get('/', (req, res) => {
  crawling().then(info => {
    res.send(info)
  })
})

module.exports = router
