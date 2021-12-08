const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const schedule = require('node-schedule')
const ProductList = require('../models/product')
const spawn = require('child_process').spawn;
const parser = require('../utils/parser')
const colorConverter = require('../utils/colorConverter')
const { xml } = require('cheerio/lib/static')
const router = express.Router()

const getDocument = async (type, color) => {
  try {
    return await axios.get(parser.getURL(type, color))
  } catch (error) {
    console.error(error)
  }
}

const parsing = (document, type, color) => {
  const $ = cheerio.load(document.data)

  const $li_box = $('#searchList .li_box').toArray()

  $li_box.forEach(element => {
    const product = new ProductList()
    const el = cheerio.load(element)
    const title = el('.list_info').text().trim()
    const src = el('.lazy').attr('data-original')
    const img = src
    const sale = el('.icon_new').text()
    const link = el('.img-block').attr('href')
    
    let price = ""
    let salePrice = "";
    
    const isSale = el('.price del').text();
    if(!!isSale){
      price = el('.price').text().split(isSale)[1].trim();
      salePrice = isSale
    }
    else{
      price = el('.price').text().trim();
    }

    
    ProductList.findOne({Title:title})
    .exec()
    .then((result) => {
      const hex = colorConverter.getColor(color)
      if(result === null){
        product.Image = img
        product.Sale = sale
        product.Title = title
        product.Price = Number(price.replace(/,/gi, "").replace("원",""))
        product.SalePrice = Number(salePrice.replace(/,/gi, "").replace("원",""))
        product.Link = link
        product.Type = type
        product.Colors = hex
        product.save(err => {
          if (err) {
            console.error(err)
            return
          }
        });
      }
      else{
        return ProductList.updateOne({ Title: result.Title }, { Colors: result.Colors.concat(hex) }).exec();
      }
    })
    .then((updatedResult) => {
      // console.log(updatedResult);
    })
    .catch((err) => {
      console.error(err);
    });
  })
}

const crawling = () => {
  const type = ["상의", "바지", "아우터", "신발", "가방", "모자"]
  for(let i=0; i<=15; i++){
    for(let j=0; j<=5; j++){
      getDocument(j, i).then(document => {
        parsing(document, type[j], i)
        console.log(`crawling ${type[j]} ${i}`)
      })
    }
  }
}

// schedule.scheduleJob('0 0 * * * *', () => {
//   crawling();
// })

router.get('/', (req, res) => {
  ProductList.find({})
    .limit(90)
    .then(result => {
      res.send(result)
      return;
    })
})

router.get('/crawling', (req, res) => {
  crawling();
  res.send("crawling 중")
})


router.get('/colors', (req, res) => {
  const color = req.query.color;
  ProductList.find({Colors:{$in:[color]}})
    .limit(90)
    .then(productList => {
      res.send(productList)
    })
    .catch(e => res.send(e))
})

router.get('/category', (req, res) => {
  const Type = req.query.category;
  ProductList.find({Type})
    .limit(90)
    .then(productList => {
      res.send(productList)
    })
    .catch(e => res.send(e))
})


module.exports = router