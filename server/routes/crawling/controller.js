const axios = require("axios");
const cheerio = require("cheerio");
const spawn = require("child_process").spawn;
const { xml } = require("cheerio/lib/static");
const { filter } = require("domutils");
// const schedule = require("node-schedule");
const colors = require("../../utils/colors");
const parser = require("../../utils/parser");
const ProductList = require("../../models/product");
const { createResponse } = require("../../utils/response");

const getDocument = async (type, color) => {
  try {
    return await axios.get(parser.getURL(type, color));
  } catch (error) {
    console.error(error);
  }
};

const parsing = (document, type, color) => {
  const $ = cheerio.load(document.data);
  const $li_box = $("#searchList .li_box").toArray();

  $li_box.forEach((element) => {
    const product = new ProductList();
    const el = cheerio.load(element);
    const title = el(".list_info").text().trim();
    const src = el(".lazy").attr("data-original");
    const img = src;
    const sale = el(".icon_new").text();
    const link = el(".img-block").attr("href");

    let price = "";
    let salePrice = "";

    const isSale = el(".price del").text();
    if (!!isSale) {
      price = el(".price").text().split(isSale)[1].trim();
      salePrice = isSale;
    } else {
      price = el(".price").text().trim();
    }

    ProductList.findOne({ Title: title })
      .exec()
      .then((result) => {
        const hex = colors.getColor(color);
        // DB에 없을 경우
        if (result === null) {
          product.Image = img;
          product.Sale = sale;
          product.Title = title;
          product.Price = Number(price.replace(/,/gi, "").replace("원", ""));
          product.SalePrice = Number(
            salePrice.replace(/,/gi, "").replace("원", "")
          );
          product.Link = link;
          product.Type = type;
          product.Colors = hex;
          product.save((err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        }
        // DB에 있을경우
        else {
          // 동일한 상품이지만, 다른 컬러를 검색할 때 검색된 경우에는 컬러 칼럼에 추가
          ProductList.findOne({ Colors: { $in: [hex] } }).then((result) => {
            if (result === null) {
              return ProductList.updateOne(
                { Title: result.Title },
                { Colors: result.Colors.concat(hex) }
              ).exec();
            }
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

const crawling = () => {
  const type = ["상의", "바지", "아우터", "신발", "가방", "모자"];
  const typeIndex = 5;
  const colorIndex = 15;
  for (let i = 0; i <= colorIndex; i++) {
    for (let j = 0; j <= typeIndex; j++) {
      getDocument(j, i).then((document) => {
        parsing(document, type[j], i);
        console.log(`crawling ${type[j]} ${i}`);
      });
    }
  }
};

const getCrawling = (req, res) => {
  try {
    crawling();
    res.json(createResponse(res));
  } catch (e) {
    const { message, status } = e;
    res.json(createResponse(res, message, status));
  }
};

// schedule.scheduleJob("0 0 * * * *", () => {
//   crawling();
// });

exports.getCrawling = getCrawling;
