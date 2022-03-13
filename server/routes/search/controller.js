const { createResponse } = require("../../utils/response");
const ProductList = require("../../models/product");

const getSearch = (req, res) => {
  ProductList.find({})
    .limit(90)
    .then((result) => {
      res.json(createResponse(res, result));
    })
    .catch((e) => {
      const { message, status } = e;
      res.json(createResponse(res, message, status));
    });
};

const getTagSearch = (req, res) => {
  const { color, type } = req.body;

  const filter1 = color.map((v) => ({ Colors: { $in: [v] } }));
  const filter2 = type.map((v) => ({ Type: v }));

  if (filter1.length > 0 && filter2.length > 0) {
    ProductList.find()
      .and([{ $or: filter1 }, { $or: filter2 }])
      .then((productList) => {
        res.json(createResponse(res, productList));
      })
      .catch((e) => {
        const { message, status } = e;
        res.json(createResponse(res, message, status));
      });
  } else if (filter1.length > 0 && filter2.length === 0) {
    ProductList.find({ $or: filter1 })
      .limit(200)
      .then((productList) => {
        res.json(createResponse(res, productList));
      })
      .catch((e) => {
        const { message, status } = e;
        res.json(createResponse(res, message, status));
      });
  } else if (filter1.length === 0 && filter2.length > 0) {
    ProductList.find({ $or: filter2 })
      .limit(200)
      .then((productList) => {
        res.json(createResponse(res, productList));
      })
      .catch((e) => {
        const { message, status } = e;
        res.json(createResponse(res, message, status));
      });
  } else {
    ProductList.find({})
      .limit(200)
      .then((productList) => {
        res.json(createResponse(res, productList));
      })
      .catch((e) => {
        const { message, status } = e;
        res.json(createResponse(res, message, status));
      });
  }
};

const getCategorySearch = (req, res) => {
  const { tag, value } = req.body;
  if (tag === "name") {
    const query = new RegExp(value);
    ProductList.find({ Title: query })
      .then((productList) => {
        res.json(createResponse(res, productList));
      })
      .catch((e) => {
        const { message, status } = e;
        res.json(createResponse(res, message, status));
      });
  } else if (tag === "price") {
    ProductList.find({ Price: { $lte: value } })
      .then((productList) => {
        res.json(createResponse(res, productList));
      })
      .catch((e) => {
        const { message, status } = e;
        res.json(createResponse(res, message, status));
      });
  }
};

exports.getSearch = getSearch;
exports.getTagSearch = getTagSearch;
exports.getCategorySearch = getCategorySearch;
