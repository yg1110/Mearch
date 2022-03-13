const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("", controller.getClothset);
router.post("", controller.setClothset);
router.post("/search", controller.searchClothset);

module.exports = router;
