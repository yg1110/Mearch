const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const schedule = require('node-schedule')
const ProductList = require('../models/product')
const spawn = require('child_process').spawn;
const parser = require('../utils/parser')
const router = express.Router()

const getDocument = async () => {
  try {
    return await axios.get(parser.getURL())
  } catch (error) {
    console.error(error)
  }
}

const crawling = () => {
  return getDocument().then(document => {
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
      product.Image = img
      product.Sale = sale
      product.Title = title
      product.Price = Number(price.replace(/,/gi, "").replace("원",""))
      product.SalePrice = Number(salePrice.replace(/,/gi, "").replace("원",""))
      const result = spawn('python3', [`${process.cwd()}/python/colorCluster.py`, img])

      result.stdout.on('data', function(data) {
        const arr = parser.getArrayParser(data);

        for(const colors of arr){
          const color = colors.filter(color=>color !== "");
          product.Colors.push(parser.colorToRGB(color));
        }

        product.save(err => {
          if (err) {
            console.error(err)
            return
          }
        })
      });
    })
  })
}



schedule.scheduleJob('0 15 * * * *', () => {
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
