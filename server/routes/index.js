const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const schedule = require('node-schedule')
const ProductList = require('../models/product')

const router = express.Router()

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
      let productList = new ProductList()
      const el = cheerio.load(element)
      const title = el('.list_info').text().trim()
      const src = el('.lazy').attr('data-original')
      const img = `https:${src}`
      const price = el('.price').find('del').text()
      const salePrice = el('.price').text().split(price)[1].trim()
      const sale = el('.icon_new').text()

      productList.Image = img
      productList.Sale = sale
      productList.Title = title
      productList.Price = Number(price.replace(/,/gi, "").replace("원",""))
      productList.SalePrice = Number(salePrice.replace(/,/gi, "").replace("원",""))
      productList.save(err => {
        if (err) {
          console.error(err)
          return
        }
      })
    })
  })
}

schedule.scheduleJob('0 0 * * * *', () => {
  crawling().then(() => {
    console.log('crawling')
  })
})

router.get('/', (req, res) => {
  ProductList.find({})
    .sort({_id: -1, _id: 1})
    .limit(90)
    .then(productList => res.send(productList))
    .catch(e => res.send(e))
})

module.exports = router
