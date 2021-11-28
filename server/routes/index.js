const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const schedule = require('node-schedule')
const ProductList = require('../models/product')
const spawn = require('child_process').spawn;
const parser = require('../utils/parser')
const colorConverter = require('../utils/colorConverter')
const router = express.Router()

const getDocument = async (type) => {
  try {
    return await axios.get(parser.getURL(type))
  } catch (error) {
    console.error(error)
  }
}

const parsing = (document, type) => {
  const prefix = "https://store.musinsa.com/"

  const $ = cheerio.load(document.data)

  const $li_box = $('.li_box').toArray()

  $li_box.forEach(element => {
    const product = new ProductList()
    const el = cheerio.load(element)
    const title = el('.list_info').text().trim()
    const src = el('.lazy').attr('data-original')
    const img = `https:${src}`
    const price = el('.price').find('del').text()
    const salePrice = el('.price').text().split(price)[1].trim()
    const sale = el('.icon_new').text()
    const link = el('.img-block').attr('href')
    product.Image = img
    product.Sale = sale
    product.Title = title
    product.Price = Number(price.replace(/,/gi, "").replace("원",""))
    product.SalePrice = Number(salePrice.replace(/,/gi, "").replace("원",""))
    product.Link = prefix + link
    product.Type = type
    const result = spawn('python3', [`${process.cwd()}/python/colorCluster.py`, img])

    result.stdout.on('data', function(data) {
      const arr = parser.getArrayParser(data);
      const hex = [];

      for(const colors of arr){
        const color = colors.filter(color=>color !== "");
        hex.push(colorConverter.convertRGBtoHex(color));
      }

      product.Colors = hex;
      product.ColorsCondition = colorConverter.getColorCondition(hex)
      product.save(err => {
        if (err) {
          console.error(err)
          return
        }
      })
    });
  })
}

// schedule.scheduleJob('0 53 * * * *', () => {
//   getDocument("상의").then(document => {
//     parsing(document, "상의")
//   })
// })

// schedule.scheduleJob('0 37 * * * *', () => {
//   getDocument("바지").then(document => {
//     parsing(document, "바지")
//   })
// })

// schedule.scheduleJob('0 38 * * * *', () => {
//   getDocument("아우터").then(document => {
//     parsing(document, "아우터")
//   })
// })

// schedule.scheduleJob('0 39 * * * *', () => {
//   getDocument("가방").then(document => {
//     parsing(document, "가방")
//   })
// })

// schedule.scheduleJob('0 40 * * * *', () => {
//   getDocument("신발").then(document => {
//     parsing(document, "신발")
//   })
// })

// schedule.scheduleJob('0 41 * * * *', () => {
//   getDocument("모자").then(document => {
//     parsing(document, "모자")
//   })
// })

router.get('/', (req, res) => {
  ProductList.find({Type:"상의"})
    .sort({_id: -1, _id: 1})
    .limit(90)
    .then(productList => res.send(productList))
    .catch(e => res.send(e))
})

module.exports = router
