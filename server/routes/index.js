const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const schedule = require('node-schedule')
const ProductList = require('../models/product')
const spawn = require('child_process').spawn;
const parser = require('../utils/parser')
const colorConverter = require('../utils/colorConverter')
const { xml } = require('cheerio/lib/static')
const { filter } = require('domutils')
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
      res.send({data: result, message: 'success'})
      return;
    })
    .catch(e => {
      res.send({data: null, message: `fail ${e}`})
      return;
    })
})

router.get('/crawling', (req, res) => {
  crawling();
  res.send("crawling 중")
})

router.post('/tagSearch', (req, res) => {
  let tag = req.body.tag
  let value = req.body.value
  if(tag === "name") {
    const query = new RegExp(value);
    ProductList.find({"Title" : query})
    .then(productList => {
      res.send({
        data: productList,
        message: 'success'
      })
    })
    .catch(e =>
      res.send({
        data: null,
        message: `fail ${e}`
      })
    )
  }
  else if(tag === "price"){
    ProductList.find({"Price" : {$lte:value}})
    .then(productList => 
      res.send({
        data: productList,
        message: 'success'
      })
    )
    .catch(e =>
      res.send({
        data: null,
        message: `fail ${e}`
      })
    )
  }
})


router.get('/colorset', (req, res) => {
  const colorSet = colorConverter.getClothColorSet();

  if(colorSet.length > 0){
    res.send({data : colorConverter.getClothColorSet(), message: 'success'})
  }
  else{
    res.send({data : null, message: 'Colorset Array is Empty'})
  }
})

router.post('/clothset', (req, res) => {
  let top = req.body.top
  let bottom = req.body.bottom
  top = top === "#eee6c4" ? "#ffffff" : top
  bottom = bottom === "#eee6c4" ? "#ffffff" : bottom
  top = top === "#0D0D0E" ? "#000000" : top
  bottom = bottom === "#0D0D0E" ? "#000000" : bottom
  
  
  ProductList.find().or([
    {
        $and:[
            {$or:[{Colors:{$in:[top]}}]},
            {Type:"상의"}
        ]
    },
    {
        $and:[
            {$or:[{Colors:{$in:[bottom]}}]},
            {Type:"바지"}
        ]
    },
  ])
  .then(productList => 
    res.send({
      data: productList,
      message: 'success'
    })
  )
  .catch(e =>
    res.send({
      data: null,
      message: `fail ${e}`
    })
  )
})

router.post('/setClothset', (req, res) => {
  //TODO 같은색상이 있을경우 예외처리
  let top = req.body.top
  let bottom = req.body.bottom
  colorConverter.setClothColorSet(top, bottom)
  const colorSet = colorConverter.getClothColorSet();
  res.send(colorSet)
})

router.post('/search', (req, res) => {
  const color = req.body.color
  const type = req.body.type

  const filter1 = color.map(v => ({Colors: {'$in': [v]}}))
  const filter2 = type.map(v => ({Type:v}))


  if(filter1.length > 0 && filter2.length > 0){
    ProductList.find().and([
      { $or: filter1 },
      { $or: filter2 }
    ])
    .limit(200)
    .then(productList => 
      res.send({
        data: productList,
        message: 'success'
      })
    )
    .catch(e =>
      res.send({
        data: null,
        message: `fail ${e}`
      })
    )
  }
  else if(filter1.length > 0 && filter2.length === 0){
    ProductList.find({$or : filter1})
    .limit(200)
    .then(productList =>
      res.send({
        data: productList,
        message: 'success'
      })
    )
    .catch(e => 
      res.send({
        data: null,
        message: `fail ${e}`
      })
    )
  }
  else if(filter1.length === 0 && filter2.length > 0){
    ProductList.find({$or : filter2})
    .limit(200)
    .then(productList =>
      res.send({
        data: productList,
        message: 'success'
      })
    )
    .catch(e => 
      res.send({
        data: null,
        message: `fail ${e}`
      })
    )
  }
  else{
    ProductList.find({})
    .limit(200)
    .then(productList => 
      res.send({
        data: productList,
        message: 'success'
      })
    )
    .catch(e => 
      res.send({
        data: null,
        message: `fail ${e}`
      })
    )
  }
})


module.exports = router