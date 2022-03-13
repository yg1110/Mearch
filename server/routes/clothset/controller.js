const { createResponse } = require("../../utils/response");
const colors = require("../../utils/colors");

const getClothset = (req, res) => {
  const clothset = colors.getClothset();
  if (clothset.length > 0) {
    res.json(createResponse(res, clothset));
  } else {
    res.json(createResponse(res, { message: "Colorset Array is Empty" }, 202));
  }
};

const setClothset = (req, res) => {
  const { top, bottom } = req.body;
  const colorSet = colors.setClothColorSet(top, bottom);
  res.send(colorSet);
};

const searchClothset = (req, res) => {
  const { top, bottom } = req.body;

  ProductList.find()
    .or([
      {
        $and: [{ $or: [{ Colors: { $in: [top] } }] }, { Type: "상의" }],
      },
      {
        $and: [{ $or: [{ Colors: { $in: [bottom] } }] }, { Type: "바지" }],
      },
    ])
    .then((productList) => {
      res.json(createResponse(res, productList));
    })
    .catch((e) => {
      const { message, status } = e;
      res.json(createResponse(res, message, status));
    });
};

exports.getClothset = getClothset;
exports.setClothset = setClothset;
exports.searchClothset = searchClothset;
